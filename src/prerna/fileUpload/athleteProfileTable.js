import React, { Component } from 'react';
import '../styleAthleteProfileTables.css';
import PropTypes from 'prop-types';

export const json_data2= {
  "sections" : [
      {
        "section_name": "Blutanalyse",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "green"}]},
          {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "red"}]},
          {"test_title": "t3", "ser": [{"value": "17,4", "color": "yellow"}, {"value": "61", "color": "red"}]}
        ]
      },
      {
        "section_name": "Mikrobiom",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]}
        ]
      },
      {
        "section_name": "Genetik",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "6,6", "color": "red"}, {"value": "8", "color": "green"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
          // {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          // {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          // {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          // {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t3", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t4", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t5", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t6", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t7", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t8", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t9", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t3", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t4", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t5", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t6", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t7", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t8", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t9", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t6", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t7", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t8", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t9", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t6", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t7", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t8", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t9", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t2", "ser": [{"value": "9,6", "color": "yellow"}, {"value": "70", "color": "yellow"}]}
        ]
      },
      {
        "section_name": "Kieferfunktion",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t3", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t4", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t5", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t6", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t7", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t4", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t5", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t6", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t7", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t8", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t9", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t10", "ser": [{"value": "10,7", "color": "yellow"}, {"value": "75", "color": "red"}]}
        ]
      },
      {
        "section_name": "Motorik",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          // {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]}
        ]
      },
      {
        "section_name": "Kognition",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "red"}]}
        ]
      },
      {
        "section_name": "Ernährung",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "green"}]},
          {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "red"}]},
          {"test_title": "t3", "ser": [{"value": "17,4", "color": "yellow"}, {"value": "61", "color": "red"}]}
        ]
      },
      {
      "section_name": "Psychosoziale Faktoren",
      "testsArr": [
        {"test_title": "INKognition12345", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
        {"test_title": "INKognition23243456", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "red"}]},
        {"test_title": "INKognition12345", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
        {"test_title": "INKognition23243456", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
        {"test_title": "INKognition12345", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
        {"test_title": "INKognition23243456", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
        {"test_title": "INKognition12345", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
        {"test_title": "INKognition23243456", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]}
        
      ]
    },
    {
      "section_name": "Anthropometrie",
      "testsArr": [
        {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "green"}]},
        {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "red"}]},
        {"test_title": "t3", "ser": [{"value": "17,4", "color": "yellow"}, {"value": "61", "color": "red"}]}
      ]
    },
      {
        "section_name": "Mundgesundheit",
        "testsArr": [
          {"test_title": "INKognition12345", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
          // {"test_title": "INKognition12345", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
          // {"test_title": "INKognition12345", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
          // {"test_title": "INKognition12345", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
          // {"test_title": "INKognition12345", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
          {"test_title": "INKognition123453456", "ser": [{"value": "10,7", "color": "yellow"}, {"value": "75", "color": "red"}]}
        ]
      }
    ]
  };


  export const json_data = {"sections":[

    {"section_name":"Anthropometrie","testsDates": ["12.03.2024", "13.05.2024"],
    "testsArr":[{"test_title":"BMI [kg/m²]","desc" : "descrbie 12344","ser":[{"value":"23.5","color":"white"},{"value":"23.5","color":"red"}]},{"test_title":"Körpergewicht [kg]","desc" : "","ser":[{"value":"95.0","color":"white"}]},{"test_title":"Sitzhöhe [cm]","desc" : "","ser":[{"value":"117.2","color":"white"}]},{"test_title":"Fußlänge (links/rechts) [cm]","desc" : "","ser":[{"value":"24/24","color":"white"}]},{"test_title":"Körpergröße [cm]","desc" : "","ser":[{"value":"178.8","color":"white"}]},{"test_title":"Kniehöhe [cm]","desc" : "descrbie 12344","ser":[{"value":"55.7","color":"white"}]},{"test_title":"Reichhöhe im Stehen [cm]","desc" : "descrbie 12344","ser":[{"value":"242.9","color":"white"}]},{"test_title":"Armspannweite [cm]","desc" : "","ser":[{"value":"206.0","color":"white"}]},{"test_title":"Handspanne (links/rechts) [cm]","desc" : "","ser":[{"value":"","color":""}]}]},
    
    {"section_name":"Blutanalyse","testsDates": ["12.03.2024", "13.05.2024"],
    "testsArr":[{"test_title":"Vitamin D","desc" : "descrbie 12344","ser":[{"value":"32","color":"yellow"}]},
                {"test_title":"Eisen","desc" : "","ser":[{"value":"37.1","color":"green"}]}]},
    
    {"section_name":"Ernährung","testsDates": ["12.03.2024", "13.05.2024"],"testsArr":[{"test_title":"Proteine","desc" : "descrbie 12344","ser":[{"value":"180.5","color":"green"}]},{"test_title":"Fette","desc" : "","ser":[{"value":"81.4","color":"red"}]},{"test_title":"Kohlenhydrate","desc" : "descrbie 12344","ser":[{"value":"38.1","color":"red"}]},{"test_title":"Ballaststoffe","desc" : "","ser":[{"value":"24.4","color":"red"}]},{"test_title":"Energieaufnahme","desc" : "","ser":[{"value":"67.8","color":"red"}]}]},
    
    {"section_name":"Kognition","testsDates": ["12.03.2024", "13.05.2024"],"testsArr":[{"test_title":"Motorische Inhibition [ms]","desc" : "","ser":[{"value":"215.1","color":"green"}]},{"test_title":"Informationsverarbeitungsgeschwindigkeit (ZVT_SW)","desc" : "","ser":[{"value":"144.8","color":"green"}]},{"test_title":"Arbeitstempo (d2-R)","desc" : "descrbie 12344","ser":[{"value":"96.6","color":"green"}]},{"test_title":"Fehlerrate (d2-R, SW)","desc" : "","ser":[{"value":"93.4","color":"green"}]},{"test_title":"Konzentration (d2-R, SW)","desc" : "","ser":[{"value":"112.3","color":"green"}]}]},
    
    {"section_name":"Mikrobiom","testsDates": ["12.03.2024", "13.05.2024"],"testsArr":[{"test_title":"a-Diversität (Shannon - Index)","desc" : "","ser":[{"value":"4.5","color":"green"}]}]},
    
    {"section_name":"Motorik","testsDates": ["12.03.2024", "13.05.2024"],"testsArr":[{"test_title":"Rumpfkraft relativ (ext./flex.) [N/kg]","desc" : "descrbie 12344","ser":[{"value":"3.6","color":"green"}]},{"test_title":"Griffkraft relativ (links/rechts) [N/kg]","desc" : "","ser":[{"value":"3.7","color":"yellow"}]},{"test_title":"Jump & Reach (absolut/relativ) [cm]","desc" : "","ser":[{"value":"355.4","color":"red"}]},{"test_title":"Block Jump (links/rechts) [cm]","desc" : "","ser":[{"value":"54.6","color":"red"}]},{"test_title":"Counter Movement Jump [cm]","desc" : "descrbie 12344","ser":[{"value":"44.0","color":"yellow"}]},{"test_title":"Drop Jump (RSI beidbeinig) [m/s]","desc" : "","ser":[{"value":"1.6","color":"green"}]},{"test_title":"Sprint frontal (5/10m) [s]","desc" : "","ser":[{"value":"1.0","color":"yellow"}]},{"test_title":"Sprint lateral links (5/10m) [s]","desc" : "","ser":[{"value":"0.8","color":"green"}]},{"test_title":"Sprint lateral rechts (5/10m) [s]","desc" : "","ser":[{"value":"0.9","color":"green"}]},{"test_title":"Sprint rückwärts (5/10m) [s]","desc" : "","ser":[{"value":"1.1","color":"green"}]},{"test_title":"Richtungswechsel [s]","desc" : "","ser":[{"value":"7.8","color":"green"}]},{"test_title":"Tapping [Hz]","desc" : "descrbie 12344","ser":[{"value":"10.9","color":"green"}]},{"test_title":"Mot. Kosten Tapping (Zahlen/Farben) [Hz]","desc" : "","ser":[{"value":"1.6","color":"green"}]},{"test_title":"Sprunggelenksbeweglichkeit (links/rechts) [cm]","desc" : "descrbie 12344","ser":[{"value":"9.4","color":"green"}]},{"test_title":"Y-Balance (Gesamtscore links/rechts)","desc" : "","ser":[{"value":"85.1","color":"green"}]},{"test_title":"Medizinballwurf (links/rechts/OH) [m]","desc" : "","ser":[{"value":"11.1","color":"green"}]},{"test_title":"Druckkraft relativ (Verlagerung links/50-50/rechts) [N/kg]","desc" : "","ser":[{"value":"2.8","color":"green"}]}]},
    
    {"section_name":"Psychosoziale Faktoren","testsDates": ["12.03.2024", "13.05.2024"],"testsArr":[{"test_title":"Stress","desc" : "","ser":[{"value":"","color":"green"}]},{"test_title":"Finanzielle Unsicherheit","desc" : "descrbie 12344","ser":[{"value":"","color":"yellow"}]},{"test_title":"Kritische Lebensereignisse","desc" : "","ser":[{"value":"","color":"red"}]},{"test_title":"Angst","desc" : "","ser":[{"value":"","color":"red"}]},{"test_title":"Sportbezogene Unzufriedenheit","desc" : "","ser":[{"value":"","color":"green"}]},{"test_title":"Soziale Unterstützung","desc" : "","ser":[{"value":"","color":"yellow"}]},{"test_title":"Drop-Out-Gedanken","desc" : "descrbie 12344","ser":[{"value":"","color":"red"}]}]}]};
    
// export const json_data2 = {"sections":[{"section_name":"Anthropometrie","testsArr":[{"test_title":"BMI [kg/m²]","ser":[{"value":"23.5","color":"white"}]},{"test_title":"Körpergewicht [kg]","ser":[{"value":"95.0","color":"white"}]},{"test_title":"Sitzhöhe [cm]","ser":[{"value":"117.2","color":"white"}]},{"test_title":"Fußlänge (links/rechts) [cm]","ser":[{"value":"24/24","color":"white"}]},{"test_title":"Körpergröße [cm]","ser":[{"value":"178.8","color":"white"}]},{"test_title":"Kniehöhe [cm]","ser":[{"value":"55.7","color":"white"}]},{"test_title":"Reichhöhe im Stehen [cm]","ser":[{"value":"242.9","color":"white"}]},{"test_title":"Armspannweite [cm]","ser":[{"value":"206.0","color":"white"}]},{"test_title":"Handspanne (links/rechts) [cm]","ser":[{"value":"","color":""}]}]},{"section_name":"Blutanalyse","testsArr":[{"test_title":"Vitamin D","ser":[{"value":"32","color":"yellow"}]},{"test_title":"Eisen","ser":[{"value":"37.1","color":"green"}]}]},{"section_name":"Ernährung","testsArr":[{"test_title":"Proteine","ser":[{"value":"180.5","color":"green"}]},{"test_title":"Fette","ser":[{"value":"81.4","color":"red"}]},{"test_title":"Kohlenhydrate","ser":[{"value":"38.1","color":"red"}]},{"test_title":"Ballaststoffe","ser":[{"value":"24.4","color":"red"}]},{"test_title":"Energieaufnahme","ser":[{"value":"67.8","color":"red"}]}]},{"section_name":"Kognition","testsArr":[{"test_title":"Motorische Inhibition [ms]","ser":[{"value":"215.1","color":"green"}]},{"test_title":"Informationsverarbeitungsgeschwindigkeit (ZVT_SW)","ser":[{"value":"144.8","color":"green"}]},{"test_title":"Arbeitstempo (d2-R)","ser":[{"value":"96.6","color":"green"}]},{"test_title":"Fehlerrate (d2-R, SW)","ser":[{"value":"93.4","color":"green"}]},{"test_title":"Konzentration (d2-R, SW)","ser":[{"value":"112.3","color":"green"}]}]},{"section_name":"Mikrobiom","testsArr":[{"test_title":"a-Diversität (Shannon - Index)","ser":[{"value":"4.5","color":"green"}]}]},{"section_name":"Motorik","testsArr":[{"test_title":"Rumpfkraft relativ (ext./flex.) [N/kg]","ser":[{"value":"3.6","color":"green"}]},{"test_title":"Griffkraft relativ (links/rechts) [N/kg]","ser":[{"value":"3.7","color":"yellow"}]},{"test_title":"Jump & Reach (absolut/relativ) [cm]","ser":[{"value":"355.4","color":"red"}]},{"test_title":"Block Jump (links/rechts) [cm]","ser":[{"value":"54.6","color":"red"}]},{"test_title":"Counter Movement Jump [cm]","ser":[{"value":"44.0","color":"yellow"}]},{"test_title":"Drop Jump (RSI beidbeinig) [m/s]","ser":[{"value":"1.6","color":"green"}]},{"test_title":"Sprint frontal (5/10m) [s]","ser":[{"value":"1.0","color":"yellow"}]},{"test_title":"Sprint lateral links (5/10m) [s]","ser":[{"value":"0.8","color":"green"}]},{"test_title":"Sprint lateral rechts (5/10m) [s]","ser":[{"value":"0.9","color":"green"}]},{"test_title":"Sprint rückwärts (5/10m) [s]","ser":[{"value":"1.1","color":"green"}]},{"test_title":"Richtungswechsel [s]","ser":[{"value":"7.8","color":"green"}]},{"test_title":"Tapping [Hz]","ser":[{"value":"10.9","color":"green"}]},{"test_title":"Mot. Kosten Tapping (Zahlen/Farben) [Hz]","ser":[{"value":"1.6","color":"green"}]},{"test_title":"Sprunggelenksbeweglichkeit (links/rechts) [cm]","ser":[{"value":"9.4","color":"green"}]},{"test_title":"Y-Balance (Gesamtscore links/rechts)","ser":[{"value":"85.1","color":"green"}]},{"test_title":"Medizinballwurf (links/rechts/OH) [m]","ser":[{"value":"11.1","color":"green"}]},{"test_title":"Druckkraft relativ (Verlagerung links/50-50/rechts) [N/kg]","ser":[{"value":"2.8","color":"green"}]}]},{"section_name":"Psychosoziale Faktoren","testsArr":[{"test_title":"Stress","ser":[{"value":"","color":"green"}]},{"test_title":"Finanzielle Unsicherheit","ser":[{"value":"","color":"yellow"}]},{"test_title":"Kritische Lebensereignisse","ser":[{"value":"","color":"red"}]},{"test_title":"Angst","ser":[{"value":"","color":"red"}]},{"test_title":"Sportbezogene Unzufriedenheit","ser":[{"value":"","color":"green"}]},{"test_title":"Soziale Unterstützung","ser":[{"value":"","color":"yellow"}]},{"test_title":"Drop-Out-Gedanken","ser":[{"value":"","color":"red"}]}]}]};
  export default class AthleteProfileTable extends Component {
    static defaultProps = {
      data: json_data,
      section_name: '',
      // positionStyle: ''
    };

    constructor(props) {
      super(props);
      this.tableRef = React.createRef();
      this.state = {
        expandedSection: null,
        activeDesc: null,
        activeCellCoords: null,
        rowHeight: null
      };
    }

    componentDidMount() {
      this.computeTableDimensions();
    }
  
    computeTableDimensions() {
      if (this.tableRef.current) {
        const tableWidth = this.tableRef.current.clientWidth;
        const tableHeight = this.tableRef.current.clientHeight;
        console.log('Table Width:', tableWidth, 'Table Height:', tableHeight);
        this.props.onTableHeightChange(tableHeight);
      }
    }

    computeRowHeight() {
      if (this.tableRef.current) {
          const rowHeight = this.tableRef.current.querySelector('tbody tr').clientHeight;
          return rowHeight;
      }
      return 0;
  }

    computeTableWidth(section) {
        const TEST_TITLE_WIDTH = 100;
        const SER_ITEM_WIDTH = 50;

        const totalSerItems = section.testsArr[0].ser.length;
        console.log("TEST_TITLE_WIDTH + (totalSerItems * SER_ITEM_WIDTH) + 'px';" , TEST_TITLE_WIDTH + (totalSerItems * SER_ITEM_WIDTH))
        return TEST_TITLE_WIDTH + (totalSerItems * SER_ITEM_WIDTH) + 'px';
    }

    handleCellClick = (desc, activeCellCoords) => {
      const rowHeight = this.computeRowHeight();
      this.setState({ activeDesc: desc, activeCellCoords: activeCellCoords, rowHeight });
      console.log("activeCellCoords : ", activeCellCoords)
    }


    render() {
      const { data, section_name,} = this.props;
      const { activeDesc, activeCellCoords, rowHeight} = this.state;

      // const colorBarData = data.sections
      //   .filter((section) => section.section_name === section_name)
      //   .map((section) =>
      //     section.testsArr.map((test) => test.ser[test.ser.length - 1].color)
      //   )
      //   .flat();


      return (
        <div style={{ width: '100%', padding: '10px'}}>
          {/* {this.renderColorBar(colorBarData)} */}
          {/* {colorBarData && this.renderColorBar(colorBarData)} */}


{/*           
          {data.sections.map((section, index) => {
            if (section.section_name === section_name) {
              const maxColumnsForSection = Math.max(
                ...section.testsArr.map((test) => test.ser.length)
              ); */}

              {/* <div style={{ width: '100%', padding: '10px'}}> */}
            {data.sections.map((section, index) => {
              if (section.section_name === section_name) {
                const testTitles = section.testsArr.map(test => test.test_title);
                const datesToRender = section.testsDates.filter((date, index) => {
                const serCount = section.testsArr.reduce((acc, test) => {
                return acc + (test.ser[index] ? 1 : 0);
              }, 0);
              return serCount > 0;
            });
            const maxColumnsForSection = Math.max(
              ...section.testsArr.map((test) => test.ser.length)
            );

              return (
                <div
                  key={index}
                  style={{
                    padding: '5',
                    borderRadius: '5px',
                    border: '2px solid #000000',
                    marginBottom: '10px',
                    backgroundColor: 'white',
                    position: 'relative'
                    }}
                >
                  {/* <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>
                    {section.section_name}
                  </div> */}
                  {/* {this.renderColorBar(colorBarData)} */}
                  <table
                    ref={this.tableRef}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '300px',
                      borderCollapse: 'collapse',
                      border: '1px solid #f3f2f3',
                      // zIndex: 3
                    }}
                  >
                    {/* <thead>
                    <tr>
                      <th colSpa={maxColumnsForSection + 1} style={{ textAlign: 'right', paddingRight: '25px' }}>
                         {section.testsDates[section.testsDates.length - 1]}
                      </th>
                    </tr>
                  </thead> */}

                  {/* <thead >
                    <tr style={{
                              fontWeight: 'bold',
                              textAlign: 'center',
                              
                            }}>
                      <th></th> 
                      {section.testsDates.map((date, dateIndex) => (
                        <th key={dateIndex}>{date}</th>
                      ))}
                      {Array.from({ length: maxColumnsForSection - section.testsDates.length }).map((_, i) => (
                        <th key={`emptyHeader${i}`}></th>
                      ))}
                    </tr>
                  </thead> */}


                      <thead>
                    <tr style={{
                              fontWeight: 'bold',
                              textAlign: 'center',
                              
                            }}>
                      <th></th> {/* Blank cell for test titles */}
                      {datesToRender.map((date, dateIndex) => (
                        <th key={dateIndex}>{date}</th>
                      ))}
                      {Array.from({ length: maxColumnsForSection - datesToRender.length }).map((_, i) => (
                        <th key={`emptyHeader${i}`}></th>
                      ))}
                    </tr>
                  </thead>

                    <tbody>
                      {section.testsArr.map((test,rowIndex) => (
                        <tr key={test.test_title}>
                          <td
                          onClick={() => this.handleCellClick(test.desc, { rowIndex:rowIndex , colIndex: 0 })}
                            style={{
                              border: '1px solid lightgrey',
                              padding: '5px',
                              backgroundColor: '#F7F7F7',
                              fontWeight: 'bold',
                              textAlign: 'left',
                              position: 'relative',
                            }}
                            // onClick={() => this.toggleTooltip(test.desc)}
                          >
                            {test.test_title.trim()}
                          {test.desc && (
                            <sup
                              style={{
                                fontSize: '1em',
                                marginLeft: '3px',
                                color: 'blue',
                                cursor: 'pointer',
                                // zIndex: 5,
                                // position: 'relative'
                              }}
                              title={test.desc}
                            >
                              ?
                            </sup>
                          )}

                            {/* {tooltipDesc === test.desc && (
                            <div style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid black', padding: '5px', top: '100%', left: 0, zIndex: 9999 }}>
                              {test.desc}
                            </div>
                          )} */}
                        </td>

                            
                          {test.ser.map((s, sIndex) => (
                            <td
                              key={sIndex}
                              className={`${s.color}-light`}
                              style={{
                                border: '1px solid #f3f2f3',
                                fontWeight: 'bold',
                                padding: '5px',
                                textAlign: 'center',
                              }}
                            >
                              {s.value}
                              {/* {test.desc && (
                              <sup
                                style={{
                                  fontSize: '0.7em',
                                  marginLeft: '3px',
                                  color: 'blue',
                                  cursor: 'pointer',
                                }}
                                title={test.desc}
                              >
                                ?
                              </sup>
                            )} */}
                            </td>
                          ))}
                          {Array.from({ length: maxColumnsForSection - test.ser.length }).map(
                            (_, i) => (
                              <td
                                key={i + test.ser.length}
                                style={{
                                  border: '1px solid #f3f2f3',
                                  padding: '5px',
                                  textAlign: 'left',
                                }}
                              ></td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {activeDesc && activeCellCoords && (
                  <div
                  style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(211, 211, 211, 0.9)', // Light gray with opacity
                    padding: '10px', // Increased padding for larger size
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    zIndex: '9999',
                    top: `calc(${activeCellCoords.rowIndex} * ${rowHeight}px)`,
                    left: `calc(${activeCellCoords.colIndex}px)`,
                    width: 'auto',
                    maxWidth: '400px',
                  }}
                  >
                    {activeDesc}
                  </div>
                )}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      );
    }
  }
