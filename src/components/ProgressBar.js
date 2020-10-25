import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import {
    color1,
    
    
} from '../constants';

var data, max, box_width, done_no, backgroundColor;
const win_width = Dimensions.get('window').width;
const win_height = Dimensions.get('window').height;
class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.calculate();
    }
    calculate() {
        data = [];
        max = parseInt(this.props.max);

        for (var i = 0; i < max; i++) {
            data.push(i + 1);
        }
        var sum_margin = 2 * (max + 1);
        box_width = Math.floor((win_width - sum_margin) / max);
        done_no = parseInt(this.props.step_no);
        if (typeof this.props.color !== 'undefined') {
            backgroundColor = this.props.color;
        } else {
            backgroundColor = color1[4];
        }
    }
    render() {
        this.calculate();
        return (
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                {data.map((key, index) => {
                    if (index < done_no)
                        return (
                            <View key={index} style={[styles.box, styles.done, { width: box_width }]}>
                                <Text style={styles.contentText}>{key}</Text>
                            </View>
                        );
                    else
                        return (
                            <View key={index} style={[styles.box, styles.wait, { width: box_width }]}>
                                <Text style={styles.contentText}>{key}</Text>
                            </View>
                        );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        width: '100%',
        marginTop: 2,
        fontSize: 10,
        justifyContent: "center",
    },
    box: {
        backgroundColor: "white",
        height: 10,
        marginLeft: 2,
    },
    done: {
        opacity: 0.95,
    },
    wait: {
        opacity: 0.4,
    },
    contentText: {
        fontSize: 6,
        textAlign: 'center',
    },
});

export default ProgressBar;