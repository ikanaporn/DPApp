import ViewQuestion from './ViewQuestion';

export default class ViewHamiltonQuestion extends ViewQuestion {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            volunteer_id: this.props.route.params.volunteer.id,
            render_type: 'HAMILTON'
        };
    }

    componentDidMount() {
        this.getData('HamiltonReducer');
    }

    render() {
        return this.renderQuestion();
    }
}