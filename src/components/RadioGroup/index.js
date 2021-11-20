import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radioButtons: this.validate(this.props.radioButtons),
    };
  }

  validate(data) {
    let selected = false; // Variable to check if "selected: true" for more than one button.
    
    data.map(e => {
      e.color = e.color ? e.color : '#444';
      e.disabled = e.disabled ? e.disabled : false;
      e.label = e.label ? e.label : 'You forgot to give label';
      e.labelColor = e.labelColor ? e.labelColor : '#444';
      e.labelStyles = e.labelStyles ? e.labelStyles : { color: '#444' }
      e.layout = e.layout ? e.layout : 'row';
      e.selected = e.selected ? e.selected : false;

      if (e.selected) {
        if (selected) {
          e.selected = false; // Making "selected: false", if "selected: true" is assigned for more than one button.
          console.log('Found "selected: true" for more than one button');
        } else {
          selected = true;
        }
      }

      e.size = e.size ? e.size : 24;
      e.value = e.value ? e.value : e.label;
    });

    return data;
  }

  onPress = label => {
    const { radioButtons } = this.state;
    const labelIndex = radioButtons.findIndex(e => e.label == label);

    radioButtons.map(data => (data.selected = false))
    radioButtons[labelIndex].selected = true;

    this.setState({ radioButtons }, () => this.props.onPress(this.state.radioButtons));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: this.props.flexDirection }}>
          {this.state.radioButtons.map(data => (
            <RadioButton
              key={data.label}
              data={data}
              onPress={this.onPress}
              labelStyles={this.props.labelStyles}
            />
          ))}
        </View>
      </View>
    );
  }
}

class RadioButton extends Component {
  render() {
    const { data } = this.props;
    const opacity = data.disabled ? 0.2 : 1;

    let layout = { flexDirection: 'row' };
    let margin = { marginLeft: 10 };

    if (data.layout === 'column') {
      layout = { alignItems: 'center' };
      margin = { marginTop: 10 };
    }

    return (
      <TouchableOpacity
        style={[layout, { opacity, marginHorizontal: 10, marginVertical: 5 }]}
        onPress={() => {
          data.disabled ? null : this.props.onPress(data.label);
        }}>
        <View
          style={[
            styles.border,
            {
              borderColor: data.color,
              width: data.size,
              height: data.size,
              borderRadius: data.size / 2,
              alignSelf: 'center'
            },
          ]}>
          {data.selected &&
            <View
              style={{
                backgroundColor: data.color,
                width: data.size / 2,
                height: data.size / 2,
                borderRadius: data.size / 2,
              }}
            />}
        </View>
        <Text style={[
            { alignSelf: 'center' }, 
            margin, 
            this.props.labelStyles
          ]}>
            {data.label}
          </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  border: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});