import firebase from '@react-native-firebase/app';
import Queries from '../../database/queries';

const generateShareLinkFirebasePath = (routeId) => `maplinks/${routeId}.json`;

export const firebaseUploadFile = (routeId, filePath) => {
  return new Promise((resolve, reject) => {
    const fileRef = firebase
      .app()
      .storage('')
      .ref(generateShareLinkFirebasePath(routeId));

    fileRef
      .putFile(filePath)
      .then(() => {
        const linkParams = {
          link: ``,
          domainUriPrefix: '',
          navigation: { forcedRedirectEnabled: true },
        };

        firebase
          .dynamicLinks()
          .buildShortLink(linkParams, 'UNGUESSABLE')
          .then((url) => {
            Queries.updateSharedRouteDate(routeId, url);
            resolve(url);
          })
          .catch(() => {
            // console.log('1 error', error);
            reject();
          });
      })
      .catch(() => {
        // console.log('2 error', error);
        reject();
      });
  });
};

export const firebaseDeleteFile = (routeId) => {
  return new Promise((resolve, reject) => {
    const fileRef = firebase
      .app()
      .storage('')
      .ref(generateShareLinkFirebasePath(routeId));
    fileRef
      .delete()
      .then(() => {
        Queries.deleteSharedRouteDate(routeId);
        resolve();
      })
      .catch(() => {
        // console.log('4 error', error);
        reject();
      });
  });
};
