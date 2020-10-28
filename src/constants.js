import React from 'react';
import { Image, } from 'react-native';

export const bar = <Image
    style={{
        alignSelf: 'flex-end',
        width: 50,
        height: 50,
        resizeMode: 'center',
        zIndex: 3,
        position: 'absolute',
    }}
    source={require("../assets/img/updown.png")}
></Image>;

// Questionnaire
export const SAVE = "SAVE";
export const BACK = "BACK";

// ViewQuestionnaire
export const EDIT = "EDIT";
export const SAVE_EDIT = "SAVE_EDIT";

// Theme dark-green green yellow pink dark-blue blue
export const color1 = ["#83B8A2", "#B2DABF", "#E3EF75", "#EAABB4", "#83B8A2", "#94DEE8"];

//NavigationName
export const NavigationName = {
    MainPage: "หน้าหลัก",
    ListVolunteerPage: "รายการอาสาสมัคร",
    VolunteerPage: "อาสาสมัคร",
    BasicQuestion: "ข้อมูลพื้นฐาน",
    HamiltonQuestion: "แบบวัด HAMILTON",
    PHQ9Question: "แบบประเมิน PHQ9",
    ListAdminPage: "อาสาสมัครสำหรับผู้เก็บข้อมูล",
    AdminQuestion: "เพิ่มอาสาสมัคร",
    ViewAdminQuestion: "แก้ไขอาสาสมัคร",
    ViewBasicQuestion: "แก้ไขข้อมูลพื้นฐาน",
    ViewHamiltonQuestion: "แก้ไขแบบวัด HAMILTON",
    ViewPHQ9Question: "แก้ไขแบบประเมิน PHQ9",
    ScoreHamilton: "คะแนน HAMILTON",
    ScorePHQ9: "คะแนน PHQ9",
    VideoPage: "วิดีโอ",
    VideoHelpPage: "คำแนะนำ",
    VideoRenderPage: "ติดตั้ง",
    //MainPage: "หน้าหลัก",
}

export const TIMER_NEXT = "TIMER_NEXT";
export const TIMER_START = "TIMER_START";
export const TIMER_RETRY = "TIMER_RETRY";
export const TIMER_STOP = "TIMER_STOP";

export const NEXT_COMMAND = "NEXT_COMMAND";
export const BACK_COMMAND = "BACK_COMMAND";

//0-7, 8-12, 13-17, 18
export var HAMILTON_SCALE = [
    'green', //0
    'green', //1
    'green', //2
    'green', //3
    'green', //4
    'green', //5
    'green', //6
    'green', //7
    'yellow', //8
    'yellow', //9
    'yellow', //10
    'yellow', //11
    'yellow', //12
    'darkorange', //13
    'darkorange', //14
    'darkorange', //15
    'darkorange', //16
    'darkorange', //17
    'red', //18
];
//9
export const PHQ9_SCALE = [
    'green', //0
    'green', //1
    'green', //2
    'green', //3
    'green', //4
    'green', //5
    'green', //6
    'green', //7
    'green', //8
    'red', //9
];