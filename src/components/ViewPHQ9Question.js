import ViewQuestion from './ViewQuestion';

export default class ViewPHQ9Question extends ViewQuestion {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            volunteer_id: this.props.route.params.volunteer.id,
            render_type: 'PHQ9'
        };
    }
    async componentDidMount() {
        await this.getData('PHQ9Reducer');
    }
    render() {
        return this.renderQuestion();
    }
}