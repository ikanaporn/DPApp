const repeatword = 'ในช่วง 2 สัปดาห์ ที่ผ่านมา ท่านมีอาการ';
const repeatchoice = [
    { id: 1, content: "0. ไม่เลย", is_other: false },
    { id: 2, content: "1. มีบางวันหรือไม่บ่อย", is_other: false },
    { id: 3, content: "2. มีค่อนข้างบ่อย", is_other: false },
    { id: 4, content: "3. มีเกือบทุกวัน", is_other: false },
];
const scores = [
    "0",
    "1",
    "2",
    "3",
];
const test_length = 9;

export default [
    { //0
        question: `1. ${repeatword} เบื่อ ทำอะไร ๆ ก็ไม่เพลิดเพลิน`,
        answer_type: 'option',
        choices: repeatchoice,
        score: scores,
        next_state: [
            "1",
            "1",
            "1",
            "1",
        ],
        test_length: test_length,
        step_no: 0,
        is_show_content_choice: true,
    },
    { //1
        question: `2. ${repeatword} ไม่สบายใจ ซึมเศร้า หรือท้อแท้`,
        answer_type: 'option',
        choices: repeatchoice,
        score: scores,
        next_state: [
            "2",
            "2",
            "2",
            "2",
        ],
        test_length: test_length,
        step_no: 1,
        is_show_content_choice: true,
    },
    { //2
        question: `3. ${repeatword} หลับยาก หรือหลับ ๆ ตื่น ๆ หรือหลับมากไป`,
        answer_type: 'option',
        choices: repeatchoice,
        score: scores,
        next_state: [
            "3",
            "3",
            "3",
            "3",
        ],
        test_length: test_length,
        step_no: 2,
        is_show_content_choice: true,
    },
    { //3
        question: `4. ${repeatword} เหนื่อยง่าย หรือไม่ค่อยมีแรง`,
        answer_type: 'option',
        choices: repeatchoice,
        score: scores,
        next_state: [
            "4",
            "4",
            "4",
            "4",
        ],
        test_length: test_length,
        step_no: 3,
        is_show_content_choice: true,
    },
    { //4
        question: `5. ${repeatword} เบื่ออาหาร หรือกินมากเกินไป`,
        answer_type: 'option',
        choices: repeatchoice,
        score: scores,
        next_state: [
            "5",
            "5",
            "5",
            "5",
        ],
        test_length: test_length,
        step_no: 4,
        is_show_content_choice: true,
    },
    { //5
        question: `6. ${repeatword} รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเอง หรือครอบครัวผิดหวัง`,
        answer_type: 'option',
        choices: repeatchoice,
        score: scores,
        next_state: [
            "6",
            "6",
            "6",
            "6",
        ],
        test_length: test_length,
        step_no: 5,
        is_show_content_choice: true,
    },
    { //6
        question: `7. ${repeatword} สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ`,
        answer_type: 'option',
        choices: repeatchoice,
        score: scores,
        next_state: [
            "7",
            "7",
            "7",
            "7",
        ],
        test_length: test_length,
        step_no: 6,
        is_show_content_choice: true,
    },
    { //7
        question: `8. ${repeatword} พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย`,
        answer_type: 'option',
        choices: repeatchoice,
        score: scores,
        next_state: [
            "8",
            "8",
            "8",
            "8",
        ],
        test_length: test_length,
        step_no: 7,
        is_show_content_choice: true,
    },
    { //8
        question: `9. ${repeatword} คิดทำร้ายตนเอง หรือคิดว่าถ้าตาย ๆ ไปเสียคงจะดี`,
        answer_type: 'option',
        choices: repeatchoice,
        score: scores,
        next_state: [
            "0",
            "0",
            "0",
            "0",
        ],
        test_length: test_length,
        step_no: 8,
        is_show_content_choice: true,
    },
]