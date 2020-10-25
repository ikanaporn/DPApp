import { connect } from 'react-redux';
import { getQuestionnaire } from '../server/server';
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
        this.getData();
    }

    async getData() {
        try {
            var data = await getQuestionnaire(this.state.volunteer_id, 'HamiltonReducer');
            this.setState({ questionnaire: data });
        } catch (err) {
            return [];
        }
    }

    render() {
        return this.renderQuestion();
    }
}