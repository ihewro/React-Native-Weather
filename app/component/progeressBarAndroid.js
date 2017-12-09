'use strict';

var ProgressBar = require('ProgressBarAndroid');
var React = require('React');
var RNTesterBlock = require('RNTesterBlock');
var RNTesterPage = require('RNTesterPage');

var TimerMixin = require('react-timer-mixin');

var MovingBar = React.createClass({
    mixins: [TimerMixin],

    getInitialState: function() {
        return {
            progress: 0
        };
    },

    componentDidMount: function() {
        this.setInterval(
            () => {
                var progress = (this.state.progress + 0.02) % 1;
                this.setState({progress: progress});
            }, 50
        );
    },

    render: function() {
        return <ProgressBar progress={this.state.progress} {...this.props} />;
    },
});

var ProgressBarAndroidExample = React.createClass({

    statics: {
        title: '<ProgressBarAndroid>',
        description: 'Visual indicator of progress of some operation. ' +
        'Shows either a cyclic animation or a horizontal bar.',
    },

    render: function() {
        return (
            <RNTesterPage title="ProgressBar Examples">
                <RNTesterBlock title="Default ProgressBar">
                    <ProgressBar />
                </RNTesterBlock>

                <RNTesterBlock title="Small ProgressBar">
                    <ProgressBar styleAttr="Small" />
                </RNTesterBlock>

                <RNTesterBlock title="Large ProgressBar">
                    <ProgressBar styleAttr="Large" />
                </RNTesterBlock>

                <RNTesterBlock title="Inverse ProgressBar">
                    <ProgressBar styleAttr="Inverse" />
                </RNTesterBlock>

                <RNTesterBlock title="Small Inverse ProgressBar">
                    <ProgressBar styleAttr="SmallInverse" />
                </RNTesterBlock>

                <RNTesterBlock title="Large Inverse ProgressBar">
                    <ProgressBar styleAttr="LargeInverse" />
                </RNTesterBlock>

                <RNTesterBlock title="Horizontal Indeterminate ProgressBar">
                    <ProgressBar styleAttr="Horizontal" />
                </RNTesterBlock>

                <RNTesterBlock title="Horizontal ProgressBar">
                    <MovingBar styleAttr="Horizontal" indeterminate={false} />
                </RNTesterBlock>

                <RNTesterBlock title="Large Red ProgressBar">
                    <ProgressBar styleAttr="Large" color="red" />
                </RNTesterBlock>

                <RNTesterBlock title="Horizontal Black Indeterminate ProgressBar">
                    <ProgressBar styleAttr="Horizontal" color="black" />
                </RNTesterBlock>

                <RNTesterBlock title="Horizontal Blue ProgressBar">
                    <MovingBar styleAttr="Horizontal" indeterminate={false} color="blue" />
                </RNTesterBlock>
            </RNTesterPage>
        );
    },
});

module.exports = ProgressBarAndroidExample;