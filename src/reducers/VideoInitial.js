const instruction3_4 = "โปรดพูดตอบคำถามต่อไปนี้ให้มีรายละเอียดมากที่สุด"
const instruction3_5 = "โปรดตอบคำถามทั่วไป"
const instruction3_6 = "ตอบคำถามที่ต้องใช้จิตนาการ"
const instruction3_7 = "โปรดบรรยายความรู้สึกและความคิดของท่านที่มีต่อภาพต่อไปนี้"
const path = "../../assets/img/img_part3/"
export default [
  //no.0
  { data: "โปรดนับเลข 1 ถึง 20",
 
  },
  { data: "โปรดออกเสียงคำ “ปะ ถะ ค่ะ” อย่างชัดเจนและเร็วที่สุด ซ้ำไปเรื่อย ๆ  จนกว่าจะหมดเวลา",
 },
  //อ่านบทความมาตรฐาน
  {
inst: "โปรดอ่านบทความมาตรฐาน ภาษาไทย" ,
data:
 "โรงเรียนไตรมิตรรามอินทราของฉันและเธอ เป็นโรงเรียนเล็กเล็กริมคลองบางซื่อ อยู่ห่างจากหมู่บ้านสองแคว ประมาณหนึ่งกิโลเมตร พวกเรามีสวนติดป่าดง เราฝึกปลูกพืชผักสวนครัว และผลไม้หลายชนิด เช่น ต้นกะเพรา มะเขือเปราะ ผักกระเฉด กล้วยน้ำว้า เงาะ ลูกพลับ และมะเฟืองหวาน โดยฉันกับเพื่อนเพื่อน จะช่วยกันรดน้ำ พรวนดิน และใส่ปุ๋ย จนผักผลไม้งอกงามอยู่เสมอ ในตอนเช้าและตอนเย็น น้องน้องทุกคน ช่วยกันเก็บขยะที่เลอะเทอะ กวาดใบไม้แห้งที่ร่วงหล่น ลงบนถนนรอบอาคารเรียน และหน้าเสาธงจนสะอาด",
  },
 
  //3,4
  //3.4.1
  {
inst:instruction3_4 ,
data: "ช่วงนี้คุณเป็นอย่างไรบ้าง" ,
isVad: true,
  },
  {  
inst:instruction3_4 ,
data: "คุณคิดว่าอาการของคุณเป็นอย่างไร" ,
isVad: true,
  },
  //3.4.2
  //no 5
  { 
inst:instruction3_4 ,
data: "ช่วยบรรยายความรู้สึกของคุณในช่วง 2 สัปดาห์ที่ผ่านมา" ,
isVad: true,},

  { 
inst:instruction3_4 ,
data: "ช่วงนี้คุณรู้สึกเปลี่ยนแปลงไปจากเดิมอย่างไรบ้าง",
isVad: true, },
  //3.4.3
  { 
inst:instruction3_4 ,
data: "ชีวิตคุณในปัจจุบันเป็นอย่างไรบ้าง" ,
isVad: true,
  },
  { inst:instruction3_4 ,
data: "ช่วยเล่าถึงสิ่งที่เป็นกำลังใจในการมีชีวิตอยู่ของคุณ",
isVad: true,
 },
 
  //3.5 กลาง บวก ลบ กลาง ลบ บวก set timer 1 min/ข้อ
  //no 9
  { inst:instruction3_5,
    data: "เป้าหมายชีวิตในอนาคตของท่านคืออะไร" 
  },
  { inst:instruction3_5,
    data: "พูดถึงเหตุการณ์ที่ทำให้ท่านรู้สึกประทับใจ" 
  },
  { inst:instruction3_5,
    data: "เล่าถึงสิ่งที่ทำให้ท่านรู้สึกกลัว" },
 
  { inst:instruction3_5,
    data: "หากมีเวลาว่าง 1 ปี ท่านอยากทำอะไรบ้าง" 
  },
  { inst:instruction3_5,
    data: "เล่าเรื่องอุปสรรคที่ใหญ่ที่สุดที่เคยเกิดขึ้นในชีวิต" 
  },
  { inst:instruction3_5,
    data: "เล่าถึงสิ่งที่ท่านชอบทำหรือทำแล้วมีความสุข" 
  },
  //คำถามเป็นกลาง
 
  //คำถามกระตุ้นอารมณ์ด้านลบ
 
  //3.6 ตอบคาถามทตี่ ้องใช้จิตนาการ
  //sound ตาม 3.6 ก่อนเริ่ม 3.6.1
  //{data: 'หลังจากนี้ขอให้คุณลองนึกว่าตนเองอยู่ในสถานการณ์ดังที่จะฟังดังต่อไปนี้ เหตุการณ์ดังกล่าวอาจจะเคยเกิดขึ้นกับคุณ หรือให้ลองจินตนาการถ้ามันเกิดขึ้นจริง คุณสามารถที่จะลืมตาหรือหลับตาก็ได้'},
  // ด้านความสุข ระดับการมสี ่วนร่วมกับสังคมน้อย
  // 3.6.1 ด้านความสุข
  //no 15
  { 
    inst:instruction3_6,
    data: "คุณเดินชมพระอาทิตย์ตกดินริมทะเลเพียงลำพัง" ,
    isAudio: true,
  },
    
  {
    inst:instruction3_6,
    data: "คุณเอนตัวอ่านหนังสือที่ชอบยามบ่ายในสถานที่เงียบสงบ",
    isAudio: true,
  },
  {
    inst:instruction3_6,
    data: "คุณนอนฟังเพลงที่ชอบอยู่ในห้องส่วนตัว",
    isAudio: true,
  },
  { inst:instruction3_6,
    data: "คุณบังเอิญพบเงินจำนวนหนึ่งขณะกำลังจัดเก็บเอกสาร",
    isAudio: true,
  },
  { 
    inst:instruction3_6,
    data: "คนที่คุณแอบชอบมาบอกกับคุณว่าเขาก็ชอบคุณเหมือนกัน",
    isAudio: true, 
  },
  // ระดับการมสี ่วนร่วมกับสังคมสูง
  {
    inst:instruction3_6,
    data:
          "คุณจากบ้านไปทำงานในที่ห่างไกลคนเดียวและเข้านอนด้วยความรู้สึกโดดเดี่ยว",
    isAudio: true,
  },
  { inst:instruction3_6,
    data: "คุณแต่งกายสีดำไปเข้าร่วมพิธีศพหลังจากคนที่คุณรักตาย" ,
    isAudio: true,
  },
  { 
    inst:instruction3_6,
    data: "คุณตะโกนเสียงดังใส่คนที่คุณรักมากอย่างก้าวร้าว" ,
    isAudio: true,
  },
    
  {
    inst:instruction3_6,
    data:
    "คนที่คุณรักไว้วางใจฝากให้คุณทำเรื่องสำคัญ แต่คุณกลับไม่ได้ทำจริงตามที่สัญญาไว้",
    isAudio: true,
  },
 
  {
    inst:instruction3_6,
    data:
    "คุณตระหนักว่าไม่ว่าจะพยายามแค่ไหน คนรอบข้างก็ยังไม่เห็นคุณค่าของงานที่คุณทำ",
    isAudio: true,
  },
  {
    inst:instruction3_6,
    data:
    "คุณเดินเข้าไปหาเพื่อนที่จับกลุ่มคุยกันอย่างสนิทสนม แต่ทุกคนกลับหยุดคุยและมีท่าทีแปลกๆ",
    isAudio: true,
  },
 
  //3.7
  { inst: instruction3_7,
    data: 
      require(`${path}g0126_AC.png`),
      height:'93%',
      width:'93%', 
    isImage: true

  },
  { inst: instruction3_7,
    data: require(`${path}b0180_VU.png`),
    height:'93%',
    width:'93%',
    isImage: true
  },
  { inst: instruction3_7,
    data: require(`${path}m0208_VN.png`),
    height:'93%',
    width:'93%',
    isImage: true
  },
  { inst: instruction3_7,
    data: require(`${path}g0143_VP.png`),
    height:'93%',
    width:'93%',
    resizeMode:'center',
    isImage: true
  },
  { inst: instruction3_7,
    data: require(`${path}b0270_VU.png`),
    height:'93%',
    width:'93%',
    isImage: true
  },
  { inst: instruction3_7,
    data: require(`${path}m0288_AN.png`),
    height:'93%',
    width:'93%',
    resizeMode:'center',
    isImage: true
  },
  { data: " " },
 ];