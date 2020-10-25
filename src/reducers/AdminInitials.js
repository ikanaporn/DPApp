const test_length = 2;
const branch_test_length = [2,];

export default [
    { //0
        question: 'รหัสผู้ร่วมวิจัย',
        answer_type: 'text',
        choices: [
        ],
        next_state: [
            "1",],
        test_length: test_length,
        step_no: 0,
        is_show_content_choice: true,
    },
    { //1
        question: 'กลุ่มผู้ร่วมวิจัย',
        answer_type: 'option',
        choices: [
            { id: 1, content: "1. กลุ่มโรคซึมเศร้า", is_other: false },
            { id: 2, content: "2. กลุ่มโรคจิตเวชอื่นๆ", is_other: false },
            { id: 3, content: "3. อาสาสมัครปกติ", is_other: false },
        ],
        next_state: [
            "2",
            "3",
            "0",],
        test_length: test_length,
        step_no: 1,
        is_branch_node: true,
        branch_node_level: 1,
        is_show_content_choice: true,
    },
    { //2
        question: 'กลุ่มโรคซึมเศร้า',
        answer_type: 'option',
        choices: [
            { id: 1, content: "1. Major Depressive Disorder", is_other: false },
            { id: 2, content: "2. Bipolar Disorder, current episode depressed (HAM-D \u2265 8)", is_other: false },
            { id: 3, content: "3. Persistent Depressive Disorder (Dysthymia)", is_other: false },
        ],
        next_state: [
            "4",
            "4",
            "4",],
        test_length: test_length,
        step_no: 1,
        branch: [
            {
                branch_level: 1,
                test_length: branch_test_length[0],
                step_no: 0,
            }
        ],
        is_show_content_choice: false,
        branch_level: 1,
    },
    { //3
        question: 'กลุ่มโรคจิตเวชอื่นๆ',
        answer_type: 'option_other',
        choices: [
            { id: 1, content: "1. Psychotic disorders", is_other: false },
            { id: 2, content: "2. Bipolar Disorder, manic episode หรือ Bipolar Disorder, current episode depressed ที่อาการสงบ (HAM-D \u003C 8)", is_other: false },
            { id: 3, content: "3. Anxiety disorders, Obcessive Compulsive Disorder, Panic Disorder, Phobia", is_other: false },
            { id: 4, content: "4. Neurocognitive disorders(Dementia, Mild Cognitive Disorder)", is_other: false },
            { id: 5, content: "5. อื่นๆโปรดระบุ", is_other: true },
        ],
        next_state: [
            "4",
            "4",
            "4",
            "4",
            "4",],
        test_length: test_length,
        step_no: 1,
        branch: [
            {
                branch_level: 1,
                test_length: branch_test_length[0],
                step_no: 0,
            }
        ],
        is_show_content_choice: false,
        branch_level: 1,
    },
    { //4
        question: 'จำนวนครั้งที่มีอาการ',
        answer_type: 'option',
        choices: [
            { id: 1, content: "ครั้งแรก", is_other: false },
            { id: 2, content: "ครั้งที่สอง", is_other: false },
            { id: 3, content: "ตั้งแต่สามครั้งขึ้นไป", is_other: false },
        ],
        next_state: [
            "0",
            "0",
            "0",],
        test_length: test_length,
        step_no: 1,
        branch: [
            {
                branch_level: 1,
                test_length: branch_test_length[0],
                step_no: 1,
            }
        ],
        is_branch_end: true,
        is_show_content_choice: true,
        branch_level: 1,
    },
]