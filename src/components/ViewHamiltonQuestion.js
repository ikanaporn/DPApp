import ViewQuestion from './ViewQuestion';

export default class ViewHamiltonQuestion extends ViewQuestion {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            render_type: 'HAMILTON'
        };
    }
    componentDidMount() {
        this.setState({
            volunteer_id: this.props.route.params.volunteer.id,
        })
        this.getData('HamiltonReducer');
    }
    render() {
        return this.renderQuestion();
    }
}