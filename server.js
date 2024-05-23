// const express = require('express');
// const app = express();
// const port = 3000; // You can change the port if needed

// app.get('/test-api', (req, res) => {
//   const jsonData = {
//     "finalObj": {
//       "sections": [
//         {
//           "section_name": "Anthropometrie",
//           "testsArr": [
//             [{"test_title": "Körpergewicht [kg]", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}], "show_values": true, "show_thresholds": true}],
//             [{"test_title": "Sitzhöhe [cm]", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}], "show_values": true, "show_thresholds": true}],
//             [{"test_title": "BMI [kg/m²]", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}], "show_values": true, "show_thresholds": true}],
//             [{"test_title": "Handspanne (links/rechts) [cm]", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}], "show_values": true, "show_thresholds": true}],
//             [{"test_title": "Fußlänge (links/rechts) [cm]", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}], "show_values": true, "show_thresholds": true}],
//             [{"test_title": "Kniehöhe [cm]", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}], "show_values": true, "show_thresholds": true}],
//             [{"test_title": "Armspannweite [cm]", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}], "show_values": true, "show_thresholds": true}],
//             [{"test_title": "Körpergröße [cm]", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}], "show_values": true, "show_thresholds": true}],
//             [{"test_title": "Reichhöhe im Stehen [cm]", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}], "show_values": true, "show_thresholds": true}]
//           ]
//         },
//         {
//             "section_name": "Blutanalyse",
//             "testsArr": [
//               {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
//               {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "green"}]},
//               {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
//               {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "red"}]},
//               {"test_title": "t3", "ser": [{"value": "17,4", "color": "yellow"}, {"value": "61", "color": "red"}]}
//             ]
//           },
//           {
//             "section_name": "Mikrobiom",
//             "testsArr": [
//               {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
//               {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
//               {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
//               {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
//               {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]}
//             ]
//           },
//           {
//             "section_name": "Genetik",
//             "testsArr": [
//               {"test_title": "t1", "ser": [{"value": "6,6", "color": "red"}, {"value": "8", "color": "green"}]},
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
//               {"test_title": "t2", "ser": [{"value": "9,6", "color": "yellow"}, {"value": "70", "color": "yellow"}]}
//             ]
//           },
//           {
//             "section_name": "Soziologie",
//             "testsArr": [
//               {"test_title": "t1", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
//               {"test_title": "t2", "ser": [{"value": "10,7", "color": "yellow"}, {"value": "75", "color": "red"}]}
//             ]
//           },
//           {
//             "section_name": "Kognition",
//             "testsArr": [
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
//               {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "red"}]}
//             ]
//           },
//           {
//             "section_name": "Motorik",
//             "testsArr": [
//               {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}, {"value": "80", "color": "red"}]},
//               {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "green"}, {"value": "80", "color": "yellow"},]}
//             ]
//           }
       
//       ]
//     }
//   };
  
//   res.json(jsonData);
// });

// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });
