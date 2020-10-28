import ViewQuestion from './ViewQuestion';

export default class ViewAdminQuestion extends ViewQuestion {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            volunteer_id: this.props.route.params.volunteer.id,
            render_type: 'ADMIN'
        };
    }
    componentDidMount() {
        this.getData('AdminReducer');
    }
    render() {
        return this.renderQuestion();
    }
}