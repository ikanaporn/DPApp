const test_length = 14;

export default [
    { //0
        question: 'เพศ',
        answer_type: 'option',
        choices: [
            { id: 1, content: "1. ชาย", is_other: false },
            { id: 2, content: "2. หญิง", is_other: false },
        ],
        next_state: [
            "1",
            "1",
        ],
        test_length: test_length,
        step_no: 0,
        is_show_content_choice: true,
    },
    { //1
        question: 'วัน เดือน ปีพ. ศ.  เกิด',
        answer_type: 'calendar',
        choices: [
        ],
        next_state: [
            "2",
        ],
        test_length: test_length,
        step_no: 1,
        is_show_content_choice: true,
    },
    { //2
        question: 'สถานภาพสมรส',
        answer_type: 'option',
        choices: [
            { id: 1, content: "1. โสด", is_other: false },
            { id: 2, content: "2. สมรส/อยู่ด้วยกัน", is_other: false },
            { id: 3, content: "3. แยกกันอยู่/หย่าร้าง/ม่าย", is_other: false },
        ],
        next_state: [
            "3",
            "3",
            "3",
        ],
        test_length: test_length,
        step_no: 2,
        is_show_content_choice: true,
    },
    { //3
        question: 'ศาสนา',
        answer_type: 'option_other',
        choices: [
            { id: 1, content: "1. พุทธ", is_other: false },
            { id: 2, content: "2. คริสต์", is_other: false },
            { id: 3, content: "3. อิสลาม", is_other: false },
            { id: 4, content: "4. ไม่มี", is_other: false },
            { id: 5, content: "5. อื่นๆ โปรดระบุ", is_other: true },
        ],
        next_state: [
            "4",
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
        question: 'อาชีพ',
        answer_type: 'option_other',
        choices: [
            { id: 1, content: "1. ค้าขาย", is_other: false },
            { id: 2, content: "2. รับจ้าง", is_other: false },
            { id: 3, content: "3. เกษตรกรรม", is_other: false },
            { id: 4, content: "4. ธุรกิจส่วนตัว", is_other: false },
            { id: 5, content: "5. พนักงานประจำ ทั้งในองค์กรรัฐ รัฐวิสาหากิจ เอกชน", is_other: false },
            { id: 6, content: "6. อื่นๆ เช่น ว่างงาน เกษียณอายุ", is_other: true },
        ],
        next_state: [
            "5",
            "5",
            "5",
            "5",
            "5",
            "5",
        ],
        test_length: test_length,
        step_no: 4,
        is_show_content_choice: false,
    },
    { //5
        question: 'ความเพียงพอของรายได้',
        answer_type: 'option',
        choices: [
            { id: 1, content: "1. เพียงพอ", is_other: false },
            { id: 2, content: "2. ไม่เพียงพอ", is_other: false },
        ],
        next_state: [
            "6",
            "6",
        ],
        test_length: test_length,
        step_no: 5,
        is_show_content_choice: true,
    },
    { //6
        question: 'ระดับการศึกษา',
        answer_type: 'option',
        choices: [
            { id: 1, content: "1. น้อยกว่าประถมศึกษา", is_other: false },
            { id: 2, content: "2. ประถมศึกษา", is_other: false },
            { id: 3, content: "3. มัธยมศึกษา/ปวช. /ปวส. ", is_other: false },
            { id: 4, content: "4. ปริญญาตรี เทียบเท่าหรือมากกว่า", is_other: false },
        ],
        next_state: [
            "7",
            "7",
            "7",
            "7",
        ],
        test_length: test_length,
        step_no: 6,
        is_show_content_choice: false,
    },
    { //7
        question: 'ภูมิลำเนา',
        answer_type: 'selectedtext',
        remark: 'จังหวัด',
        choices: [
            'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยะลา', 'ยโสธร', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 'อุตรดิตถ์', 'อุบลราชธานี', 'อำนาจเจริญ',
        ],
        next_state: [
            "8",
        ],
        test_length: test_length,
        step_no: 7,
        is_show_content_choice: true,
    },
    { //8
        question: 'ภาษาที่ใช้พูดในครอบครัว',
        answer_type: 'option_other',
        choices: [
            { id: 1, content: "1. ภาษาไทยกลาง", is_other: false },
            { id: 2, content: "2. ภาษาไทยเหนือ", is_other: false },
            { id: 3, content: "3. ภาษาไทยอีสาน", is_other: false },
            { id: 4, content: "4. ภาษาไทยใต้", is_other: false },
            { id: 5, content: "5. ภาษาไทยตะวันออก", is_other: false },
            { id: 6, content: "6. อื่นๆ เช่น จีน ลาว มอญ", is_other: true },
        ],
        next_state: [
            "9",
            "9",
            "9",
            "9",
            "9",
            "9",
        ],
        test_length: test_length,
        step_no: 8,
        is_show_content_choice: false,
    },
    { //9
        question: 'ท่านเคยฉีดโบทอกหรือไม่',
        answer_type: 'option_picker',
        choices: [
            { id: 1, content: "1. ไม่เคย", is_other: false },
            {
                id: 2, content: ["2. เคย เมื่อ ", " เดือนที่แล้ว"], is_other: false, is_picker: true,
                sub_choices: [
                    { id: 2, content: "1", is_other: false },
                    { id: 3, content: "2", is_other: false },
                    { id: 4, content: "3", is_other: false },
                    { id: 5, content: "4", is_other: false },
                    { id: 6, content: "5", is_other: false },
                    { id: 7, content: "6", is_other: false },
                    { id: 8, content: "มากกว่า 6", is_other: false },
                ]
            },
        ],
        next_state: [
            "10",
            "10",
            "10",
            "10",
            "10",
            "10",
            "10",
            "10",
        ],
        test_length: test_length,
        step_no: 9,
        is_show_content_choice: false,
    },
    { //10
        question: 'โรคประจำตัว (ตอบได้มากกว่า 1 ข้อ)',
        answer_type: 'multiple',
        choices: [
            { id: 1, content: "1. ไม่มีโรคประจำตัว", is_other: false, is_go_to_next: true },
            { id: 2, content: "2. โรคหัวใจ", is_other: false },
            { id: 3, content: "3. โรคเบาหวาน", is_other: false },
            { id: 4, content: "4. โรคปอดเรื้อรัง หรือวัณโรคปอด", is_other: false },
            { id: 5, content: "5. โรคติดเชื้อเรื้อรัง", is_other: false },
            { id: 6, content: "6. โรคหลอดเลือดสองตีบหรือแตก", is_other: false },
            { id: 7, content: "7. โรคตับ", is_other: false },
            { id: 8, content: "8. โรคไต", is_other: false },
            { id: 9, content: "9. โรคกระดูกและข้อเรื้อรัง", is_other: false },
            { id: 10, content: "10. อื่นๆ", is_other: true },
        ],
        next_state: [
            "11",
        ],
        test_length: test_length,
        step_no: 10,
        is_show_content_choice: false,
    },
    { //11
        question: 'ท่านมีผลข้างเคียงจากยาที่ใช้ประจำหรือไม่ (ตอบได้มากกว่า 1 ข้อ)',
        answer_type: 'multiple',
        choices: [
            { id: 1, content: "1. ไม่มี", is_other: false, is_go_to_next: true },
            { id: 2, content: "2. ปากแห้ง คอแห้ง", is_other: false },
            { id: 3, content: "3. กรามแข็ง ลิ้นแข็ง ออกเสียงลำบาก", is_other: false },
            { id: 4, content: "4. การแสดงออกทางสีหน้าลดลง", is_other: false },
            { id: 5, content: "5. อื่นๆ โปรดระบุ", is_other: true },
        ],
        next_state: [
            "12",
        ],
        test_length: test_length,
        step_no: 11,
        is_show_content_choice: false,
    },
    { //12
        question: 'ท่านได้ใช้ฮอร์โมนเพศ เพื่อเปลี่ยนเพศสภาพตนเองหรือไม่',
        answer_type: 'option',
        choices: [
            { id: 1, content: "1. ไม่ใช้", is_other: false },
            { id: 2, content: "2. ใช้", is_other: false },
        ],
        next_state: [
            "13",
            "13",
        ],
        test_length: test_length,
        step_no: 12,
        is_show_content_choice: true,
    },
    { //13
        question: 'ท่านเคยรับการผ่าตัดหรือศัลยกรรมบริเวณใบหน้าหรือไม่ (ตอบได้มากกว่า 1 ข้อ)',
        answer_type: 'multiple',
        choices: [
            { id: 1, content: "1. ไม่เคย", is_other: false, is_go_to_next: true },
            { id: 2, content: "1. ตา", is_other: false },
            { id: 3, content: "2. คิ้ว", is_other: false },
            { id: 4, content: "3. จมูก", is_other: false },
            { id: 5, content: "4. โหนกแก้ม", is_other: false },
            { id: 6, content: "5. ปาก", is_other: false },
            { id: 7, content: "6. คางหรือกราม", is_other: false },
        ],
        next_state: [
            "0",
        ],
        test_length: test_length,
        step_no: 13,
        is_show_content_choice: true,
    },
]