import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Label } from 'native-base';
import styles from '../styles';
import PermissionWarning from './PermissionWarning';
import RouteAddButtons from './RouteAddButtons';
import Spacer from '../../../components/Spacer';
import DeleteButtons from './DeleteButtons';
import RouteList from '../../../components/RouteList';
import Loading from '../../../components/Loading';
import ReleaseNotes from './ReleaseNotes';

const RoutesComponent = ({
  editMode,
  routes,
  routesToDelete,
  loading,
  routeLoading,
  cancelEditMode,
  deleteRoutes,
  setRouteLoading,
  deleteRouteSelected,
}) => {
  return (
    <Container style={styles.routeListContainer}>
      <Content padder>
        {!editMode && (
          <>
            <PermissionWarning />
            <RouteAddButtons />
            <Spacer size={10} />
          </>
        )}
        {editMode && (
          <>
            <Label style={{ textAlign: 'center' }}>
              Select routes to delete
            </Label>
            <DeleteButtons
              cancelEditMode={cancelEditMode}
              deleteRoutes={deleteRoutes}
            />
          </>
        )}
        <RouteList
          setRouteLoading={setRouteLoading}
          pushTo="map"
          routes={routes}
          editMode={editMode}
          routesToDelete={routesToDelete}
          deleteRouteSelected={deleteRouteSelected}
        />
        <Spacer size={20} />
      </Content>
      {(loading || routeLoading) && <Loading fullscreen={false} />}
      <ReleaseNotes />
    </Container>
  );
};

RoutesComponent.propTypes = {
  editMode: PropTypes.bool.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  routesToDelete: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  routeLoading: PropTypes.bool.isRequired,
  cancelEditMode: PropTypes.func.isRequired,
  deleteRoutes: PropTypes.func.isRequired,
  setRouteLoading: PropTypes.func.isRequired,
  deleteRouteSelected: PropTypes.func.isRequired,
};

export default RoutesComponent;
