import { connect } from 'react-redux';
import { getQuestionnaire } from '../server/server';
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
        this.getData();
    }

    async getData() {
        try {
            var data = await getQuestionnaire(this.state.volunteer_id, 'BasicReducer');
            this.setState({ questionnaire: data });
        } catch (err) {
            return [];
        }
    }

    render() {
        return this.renderQuestion();
    }
}