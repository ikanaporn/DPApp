import ViewQuestion from './ViewQuestion';

export default class ViewBasicQuestion extends ViewQuestion {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            volunteer_id: this.props.route.params.volunteer.id,
            render_type: 'BASIC'
        };
    }

    componentDidMount() {
        this.getData('BasicReducer');
    }

    render() {
        return this.renderQuestion();
    }
}