import { Label, Text, Button } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { ReleaseNotesToDisplay } from '../../../common/releaseNotes';
import Colors from '../../../../native-base-theme/variables/commonColor';

class ReleaseNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayed: false,
      releaseNotes: [],
    };
  }

  componentDidMount = () => {
    const notes = ReleaseNotesToDisplay();
    this.setState({ releaseNotes: notes, displayed: notes.length > 0 });
  };

  renderVersion = (version) => {
    const features = version.features.map((feature) => {
      return this.renderFeature(feature);
    });

    return (
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: Colors.textColor,
              borderRadius: 10,
              width: 150,
            }}
          >
            <Label
              style={{
                fontWeight: '800',
                color: Colors.cardDefaultBg,
                textAlign: 'center',
                borderRadius: 20,
              }}
            >{`Version ${version.version}`}</Label>
          </View>
        </View>

        {features}
      </View>
    );
  };

  renderFeature = (feature) => {
    const instructions = feature.instructions.map((instruction) => {
      return this.renderInstruction(instruction);
    });
    return (
      <View>
        <Label
          style={{
            marginVertical: 5,
            fontWeight: '700',
            color: Colors.textColor,
          }}
        >{`* ${feature.feature}`}</Label>
        {instructions}
      </View>
    );
  };

  renderInstruction = (instruction) => {
    return (
      <View style={{ marginLeft: 20 }}>
        <Label style={{ color: Colors.textColor }}>{`-${instruction}`}</Label>
      </View>
    );
  };

  close = () => {
    this.setState({ displayed: false });
  };

  render = () => {
    const { displayed, releaseNotes } = this.state;

    const versions = releaseNotes.map((version) => {
      return this.renderVersion(version);
    });

    return (
      <Modal isVisible={displayed} backdropOpacity={0.6}>
        <View
          style={{
            width: '90%',
            height: '60%',
            padding: 20,
            marginVertical: '20%',
            marginHorizontal: '5%',
            backgroundColor: Colors.cardDefaultBg,
            borderRadius: 20,
          }}
        >
          <Label
            style={{
              textAlign: 'center',
              fontWeight: '900',
              color: Colors.textColor,
              marginBottom: 5,
            }}
          >
            Whats New
          </Label>
          <ScrollView>
            <View>{versions}</View>
          </ScrollView>
          <Button info block onPress={this.close}>
            <Text>Close</Text>
          </Button>
        </View>
      </Modal>
    );
  };
}

export default ReleaseNotes;
