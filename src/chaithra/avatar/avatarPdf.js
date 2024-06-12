import React from 'react';
import '../../prerna/avatarPdf.css';
import AthleteProfileTable from '../../prerna/fileUpload/athleteProfileTable';
import ColorBar from "../../prerna/fileUpload/colorBar";

const data = [
  {
    "sections": [
      {
        "section_name": "Anthropometrie",
        "testsArr": [
          [
            {
              "test_title": "Körpergröße [cm]",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "testForAvatar",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": "testing entries"
            }
          ],
          [
            {
              "test_title": "test123",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": "descr test"
            }
          ],
          [
            {
              "test_title": "testertq",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Fußlänge (links/rechts) [cm]",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Handspanne (links/rechts) [cm]",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Sitzhöhe [cm]",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "BMI [kg/m²]",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Kniehöhe [cm]",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Armspannweite [cm]",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Reichhöhe im Stehen [cm]",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Körpergewicht [kg]",
              "ser": [],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ]
        ]
      },
      {
        "section_name": "Blutanalyse",
        "testsArr": [
          [
            {
              "test_title": "Vitamin D",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Eisen",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "8.95",
                  "color": "green"
                },
                {
                  "date": "2023-04-01",
                  "value": "45",
                  "color": "green"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ]
        ]
      },
      {
        "section_name": "Ernährung",
        "testsArr": [
          [
            {
              "test_title": "Energieaufnahme",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Proteine",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Kohlenhydrate",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "bball",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null",
                  "color": "white"
                }
              ],
              "show_values": null,
              "show_thresholds": null,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Fette",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Ballaststoffe",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ]
        ]
      },
      {
        "section_name": "Kognition",
        "testsArr": [
          [
            {
              "test_title": "Konzentration (d2-R, SW)",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "111",
                  "color": "green"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Fehlerrate (d2-R, SW)",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "110",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Informationsverarbeitungsgeschwindigkeit (ZVT_SW)",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "117",
                  "color": "green"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Motorische Inhibition [ms]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "3",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Arbeitstempo (d2-R)",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "105",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ]
        ]
      },
      {
        "section_name": "Mikrobiom",
        "testsArr": [
          [
            {
              "test_title": "t",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "a-Diversität (Shannon - Index)",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "tester",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": "tesrtdfv fdvr"
            }
          ],
          [
            {
              "test_title": "tets545",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": "describe test"
            }
          ],
          [
            {
              "test_title": "t1dfs",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/null/null/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null/null/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "t3",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "t2",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/0.03/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/0.05/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ]
        ]
      },
      {
        "section_name": "Motorik",
        "testsArr": [
          [
            {
              "test_title": "Sprint frontal rechts (5/10m) [s]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "3/3",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "67.9/67.9",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Tapping [Hz]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "309.6",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "67.9",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Mot. Kosten Tapping (Zahlen/Farben) [Hz]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "0.88/1.49",
                  "color": "green"
                },
                {
                  "date": "2023-04-01",
                  "value": "1.38/0.31",
                  "color": "green"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Sprunggelenksbeweglichkeit (links/rechts) [cm]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "11/8",
                  "color": "green"
                },
                {
                  "date": "2023-04-01",
                  "value": "10/9",
                  "color": "green"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Y-Balance (Gesamtscore links/rechts)",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "-44.56/1.06",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "1018.67/1018.67",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Medizinballwurf (links/rechts) [m]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "309.6/309.6",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "1018.67/1018.67",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Brustpass (gerade/links/rechts) [m]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "309.6/309.6/309.6",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "1018.67/1018.67/1018.67",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Griffkraft relativ (links/rechts) [N/kg]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "3/3",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "1018.67/1018.67",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Rumpfkraft relativ (ext./flex.) [N/kg]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "7.19/7.19",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Druckkraft relativ (Verlagerung links/50-50/rechts) [N/kg]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/null/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Richtungswechsel [s]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "309.6",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "67.9",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Sprint lateral links (5/10m) [s]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "3/3",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "67.9/67.9",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Sprint frontal (5/10m) [s]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "309.6/309.6",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "67.9/67.9",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Drop Jump (RSI beidbeinig) [m/s]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "309.6",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "5",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Sergeant Jump (absolut/relativ) [cm]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "5/5",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Jump & Reach (absolut/relativ) [cm]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "-0.24/-0.24",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "5/5",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Griffkraft relativ (links/rechts) [N/kg]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "3/3",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "1018.67/1018.67",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Countermovement Jump [cm]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "3",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "67.9",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Sprint rückwärts (5/10m) [s]",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "3/3",
                  "color": "yellow"
                },
                {
                  "date": "2023-04-01",
                  "value": "67.9/67.9",
                  "color": "yellow"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": null
            }
          ]
        ]
      },
      {
        "section_name": "Mundgesundheit",
        "testsArr": [
          [
            {
              "test_title": "Test",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/16.54/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": "test"
            }
          ],
          [
            {
              "test_title": "Test",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/16.54/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": "test"
            }
          ]
        ]
      },
      {
        "section_name": "Psychosoziale Faktoren",
        "testsArr": [
          [
            {
              "test_title": "Sportbezogene Unzufriedenheit",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "7.6",
                  "color": "green"
                },
                {
                  "date": "2023-04-01",
                  "value": "7",
                  "color": "yellow"
                }
              ],
              "show_values": false,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Soziale Unterstützung im Sport",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "4",
                  "color": "green"
                },
                {
                  "date": "2023-04-01",
                  "value": "3.44",
                  "color": "green"
                }
              ],
              "show_values": false,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Drop-Out-Gedanken",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "3",
                  "color": "green"
                },
                {
                  "date": "2023-04-01",
                  "value": "3",
                  "color": "green"
                }
              ],
              "show_values": false,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Sportbezogener Stress",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "2.13",
                  "color": "red"
                },
                {
                  "date": "2023-04-01",
                  "value": "2.8",
                  "color": "red"
                }
              ],
              "show_values": false,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "test",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "null/null",
                  "color": "white"
                },
                {
                  "date": "2023-04-01",
                  "value": "null/null",
                  "color": "white"
                }
              ],
              "show_values": true,
              "show_thresholds": true,
              "desc": ""
            }
          ],
          [
            {
              "test_title": "Angst",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "3",
                  "color": "green"
                },
                {
                  "date": "2023-04-01",
                  "value": "3",
                  "color": "green"
                }
              ],
              "show_values": false,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Kritische Lebensereignisse",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "1",
                  "color": "red"
                },
                {
                  "date": "2023-04-01",
                  "value": "1",
                  "color": "red"
                }
              ],
              "show_values": false,
              "show_thresholds": true,
              "desc": null
            }
          ],
          [
            {
              "test_title": "Finanzielle Unsicherheit",
              "ser": [
                {
                  "date": "2022-04-01",
                  "value": "2.88",
                  "color": "red"
                },
                {
                  "date": "2023-04-01",
                  "value": "2.13",
                  "color": "red"
                }
              ],
              "show_values": false,
              "show_thresholds": true,
              "desc": null
            }
          ]
        ]
      }
    ]
  }
]

class AvatarPdf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarlist: data[0].sections,
      json_data: data[0],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch('https://inprove-sport.info/avatar/BhdYsskMxsTePaxTsd/getCachedAvatarElement');
      const result = await response.json();
      if (result.success) {
        this.setState({
          avatarlist: result.data[0].sections,
          json_data: result.data[0]
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  getLegendItemsForSection(sectionName) {
    if (sectionName.match(/(Mikrobiom|Blut|Ernährung)/)) {
      return [
        { color: '#9ec261', label: 'Grün = im Normbereich' },
        { color: '#fae19d', label: 'Gelb = suboptimal' },
        { color: '#c86658', label: 'Rot = auffällig' },
        { color: '#619ec2', label: 'Blau = erhöht' },
      ];
    }
    if (sectionName.match(/(Motorik|Kognition)/)) {
      return [
        { color: '#9ec261', label: 'Grün = überdurchschnittlich' },
        { color: '#fae19d', label: 'Gelb = durchschnittlich' },
        { color: '#c86658', label: 'Rot = unter durchschnittlich' },
      ];
    }
    if (sectionName.match(/Genetik/)) {
      return [
        { color: '#9ec261', label: '0 = 0 weniger ,,optimale\'\' Ausprägung' },
        { color: '#c86658', label: '100 = ,,optimale\'\' Ausprägung' },
      ];
    }
    if (sectionName.match(/Psychosoziale Aspekte/)) {
      return [
        { color: '#9ec261', label: 'Grün = unauffällig' },
        { color: '#fae19d', label: 'Gelb = leicht auffällig' },
        { color: '#c86658', label: 'Rot = auffällig' },
      ];
    }
    return [];
  }

  render() {
    const { avatarlist, json_data } = this.state;

    if (!avatarlist || avatarlist.length === 0) {
      return (
        <div>
          <div className="avatargallery" id="avatargallery">
            <p>Loading...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        {avatarlist.map((section, index) => (
          <div key={index} className="section">
            <div className="section-header">
              <span className="section-title" id={`text${index}`}>
                {section.section_name}
              </span>
            </div>
            <div className="section-body">
              <div className="avatar-all-content">
                <div className="table-container">
                  <AthleteProfileTable
                    data={json_data}
                    section_name={section.section_name}
                  />
                </div>
              </div>
              <div className="legend">
                {/* <h5>{`${section.section_name}`}</h5> */}
                <ul>
                  {this.getLegendItemsForSection(section.section_name).map((item, subIndex) => (
                    <li key={subIndex}>
                      <span
                        className="legend-color"
                        style={{
                          display: 'inline-block',
                          width: '20px',
                          height: '20px',
                          backgroundColor: item.color,
                          marginRight: '5px'
                        }}
                      ></span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                <div className="legend-category">
                  <ul>
                    <li style={{ whiteSpace: 'nowrap' }}>
                      <span
                        className="legend-color"
                        style={{
                          display: 'inline-block',
                          width: '20px',
                          height: '20px',
                          backgroundColor: '#808080',
                          marginRight: '5px'
                        }}
                      ></span>
                      <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 25px)' }}>
                        Grau = Ergebnis liegt noch nicht vor/keine Teilnahme
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AvatarPdf;

//     const legend = (
//       <div className="legend">
//         {Object.keys(legendItems).map((category, index) => (
//           <div key={index}>
//             <h5>{`Legende ${category}`}</h5>
//             <ul>
//               {legendItems[category].map((item, subIndex) => (
//                 <li key={subIndex}>
//                   <span
//                     className="legend-color"
//                     style={{
//                       display: 'inline-block',
//                       width: '20px',
//                       height: '20px',
//                       backgroundColor: item.color,
//                       marginRight: '5px'
//                     }}
//                   ></span>
//                   {item.label}
//                 </li>
//               ))}
//             </ul>
//             {index < Object.keys(legendItems).length - 1 && <br />}
//           </div>
//         ))}
//         {/* Additional item for "Grau" */}
//         <br />
//         <div className="legend-category">
//           <ul>
//             <li style={{ whiteSpace: 'nowrap' }}>
//               <span
//                 className="legend-color"
//                 style={{
//                   display: 'inline-block',
//                   width: '20px',
//                   height: '20px',
//                   backgroundColor: '#808080',
//                   marginRight: '5px'
//                 }}
//               ></span>
//               <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 25px)' }}>
//                 Grau = Ergebnis liegt noch nicht vor/keine Teilnahme
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     );

//     const sections = avatarlist;
//     const halfLength = sections.length ;

//     return (
//       <div>
//         <div className="two-column-layout">
//           <div className="column">
//             {sections.slice(0, halfLength).map((section, index) => (
//               <div key={index}>
//                 <div className="avatar-all-content">
//                   <span className="section-title" id={`text${index}`}>
//                     {section.section_name}
//                     {/* <ColorBar data={json_data} sectionName={section.section_name} /> */}
//                   </span>
//                 </div>
//                 <div className="table-container">
//                   <AthleteProfileTable
//                     data={json_data}
//                     section_name={section.section_name}
//                     // sectionData={section}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* <div className="column">
//             {sections.slice(halfLength).map((section, index) => (
//               <div key={index}>
//                 <div className="avatar-all-content">
//                   <span className="section-title" id={`text${index + halfLength}`}>
//                     {section.section_name}
                   
//                   </span>
//                 </div>
//                 <div className="table-container">
//                   <AthleteProfileTable
//                     data={json_data}
//                     section_name={section.section_name}
                    
//                   />
//                 </div>
//               </div>
//             ))}
            
//           </div> */}

//           <div className="column">
//             <div className="legend-column">
//               {legend}
//             </div>
//           </div>

//         </div>
//       </div>
//     );
//   }
// }

// export default AvatarPdf;


// import React, { Component, useEffect } from "react";
// import '../../prerna/avatar.css';
// import AthleteProfileTable from '../../prerna/fileUpload/athleteProfileTable';
// import ColorBar from "../../prerna/fileUpload/colorBar";
// import CoachInputDataService from "../../DB/rw";

// {/* <AthleteProfileTable data={json_data} /> */}

// const testdata = {
//   "sections": [
//     {
//       "section_name": "Anthropometrie",
//       "testsArr": [
//         [
//           {
//             "test_title": "Körpergröße [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "testForAvatar",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "testing entries"
//           }
//         ],
//         [
//           {
//             "test_title": "test123",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "descr test"
//           }
//         ],
//         [
//           {
//             "test_title": "testertq",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Fußlänge (links/rechts) [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Handspanne (links/rechts) [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sitzhöhe [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "BMI [kg/m²]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Kniehöhe [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Armspannweite [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Reichhöhe im Stehen [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Körpergewicht [kg]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Blutanalyse",
//       "testsArr": [
//         [
//           {
//             "test_title": "Vitamin D",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Eisen",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "8.95",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "45",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Ernährung",
//       "testsArr": [
//         [
//           {
//             "test_title": "Energieaufnahme",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Proteine",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Kohlenhydrate",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "bball",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": null,
//             "show_thresholds": null,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Fette",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Ballaststoffe",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Kognition",
//       "testsArr": [
//         [
//           {
//             "test_title": "Konzentration (d2-R, SW)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "111",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Fehlerrate (d2-R, SW)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "110",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Informationsverarbeitungsgeschwindigkeit (ZVT_SW)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "117",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Motorische Inhibition [ms]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Arbeitstempo (d2-R)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "105",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Mikrobiom",
//       "testsArr": [
//         [
//           {
//             "test_title": "t",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "a-Diversität (Shannon - Index)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "tester",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "tesrtdfv fdvr"
//           }
//         ],
//         [
//           {
//             "test_title": "tets545",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "describe test"
//           }
//         ],
//         [
//           {
//             "test_title": "t1dfs",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null/null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null/null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "t3",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "t2",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/0.03/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/0.05/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Motorik",
//       "testsArr": [
//         [
//           {
//             "test_title": "Sprint frontal rechts (5/10m) [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9/67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Tapping [Hz]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Mot. Kosten Tapping (Zahlen/Farben) [Hz]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "0.88/1.49",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1.38/0.31",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sprunggelenksbeweglichkeit (links/rechts) [cm]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "11/8",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "10/9",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Y-Balance (Gesamtscore links/rechts)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "-44.56/1.06",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Medizinballwurf (links/rechts) [m]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6/309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Brustpass (gerade/links/rechts) [m]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6/309.6/309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Griffkraft relativ (links/rechts) [N/kg]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Rumpfkraft relativ (ext./flex.) [N/kg]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "7.19/7.19",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Druckkraft relativ (Verlagerung links/50-50/rechts) [N/kg]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Richtungswechsel [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sprint lateral links (5/10m) [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9/67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sprint frontal (5/10m) [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6/309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9/67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Drop Jump (RSI beidbeinig) [m/s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "5",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sergeant Jump (absolut/relativ) [cm]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "5/5",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Jump & Reach (absolut/relativ) [cm]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "-0.24/-0.24",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "5/5",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Griffkraft relativ (links/rechts) [N/kg]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Countermovement Jump [cm]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sprint rückwärts (5/10m) [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9/67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Mundgesundheit",
//       "testsArr": [
//         [
//           {
//             "test_title": "Test",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/16.54/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "test"
//           }
//         ],
//         [
//           {
//             "test_title": "Test",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/16.54/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "test"
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Psychosoziale Faktoren",
//       "testsArr": [
//         [
//           {
//             "test_title": "Sportbezogene Unzufriedenheit",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "7.6",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "7",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Soziale Unterstützung im Sport",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "4",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "3.44",
//                 "color": "green"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Drop-Out-Gedanken",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "3",
//                 "color": "green"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sportbezogener Stress",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "2.13",
//                 "color": "red"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "2.8",
//                 "color": "red"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "test",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": ""
//           }
//         ],
//         [
//           {
//             "test_title": "Angst",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "3",
//                 "color": "green"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Kritische Lebensereignisse",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "1",
//                 "color": "red"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1",
//                 "color": "red"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Finanzielle Unsicherheit",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "2.88",
//                 "color": "red"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "2.13",
//                 "color": "red"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     }
//   ]
// }

// const json_data = {
//   "sections": [
//     {
//       "section_name": "Anthropometrie",
//       "testsArr": [
//         [
//           {
//             "test_title": "Körpergröße [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "testForAvatar",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "testing entries"
//           }
//         ],
//         [
//           {
//             "test_title": "test123",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "descr test"
//           }
//         ],
//         [
//           {
//             "test_title": "testertq",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Fußlänge (links/rechts) [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Handspanne (links/rechts) [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sitzhöhe [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "BMI [kg/m²]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Kniehöhe [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Armspannweite [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Reichhöhe im Stehen [cm]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Körpergewicht [kg]",
//             "ser": [],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Blutanalyse",
//       "testsArr": [
//         [
//           {
//             "test_title": "Vitamin D",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Eisen",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "8.95",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "45",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Ernährung",
//       "testsArr": [
//         [
//           {
//             "test_title": "Energieaufnahme",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Proteine",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Kohlenhydrate",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "bball",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": null,
//             "show_thresholds": null,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Fette",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Ballaststoffe",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Kognition",
//       "testsArr": [
//         [
//           {
//             "test_title": "Konzentration (d2-R, SW)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "111",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Fehlerrate (d2-R, SW)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "110",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Informationsverarbeitungsgeschwindigkeit (ZVT_SW)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "117",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Motorische Inhibition [ms]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Arbeitstempo (d2-R)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "105",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Mikrobiom",
//       "testsArr": [
//         [
//           {
//             "test_title": "t",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "a-Diversität (Shannon - Index)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "tester",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "tesrtdfv fdvr"
//           }
//         ],
//         [
//           {
//             "test_title": "tets545",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "describe test"
//           }
//         ],
//         [
//           {
//             "test_title": "t1dfs",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null/null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null/null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "t3",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "t2",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/0.03/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/0.05/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Motorik",
//       "testsArr": [
//         [
//           {
//             "test_title": "Sprint frontal rechts (5/10m) [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9/67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Tapping [Hz]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Mot. Kosten Tapping (Zahlen/Farben) [Hz]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "0.88/1.49",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1.38/0.31",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sprunggelenksbeweglichkeit (links/rechts) [cm]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "11/8",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "10/9",
//                 "color": "green"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Y-Balance (Gesamtscore links/rechts)",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "-44.56/1.06",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Medizinballwurf (links/rechts) [m]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6/309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Brustpass (gerade/links/rechts) [m]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6/309.6/309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Griffkraft relativ (links/rechts) [N/kg]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Rumpfkraft relativ (ext./flex.) [N/kg]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "7.19/7.19",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Druckkraft relativ (Verlagerung links/50-50/rechts) [N/kg]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Richtungswechsel [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sprint lateral links (5/10m) [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9/67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sprint frontal (5/10m) [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6/309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9/67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Drop Jump (RSI beidbeinig) [m/s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "309.6",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "5",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sergeant Jump (absolut/relativ) [cm]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "5/5",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Jump & Reach (absolut/relativ) [cm]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "-0.24/-0.24",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "5/5",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Griffkraft relativ (links/rechts) [N/kg]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1018.67/1018.67",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Countermovement Jump [cm]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sprint rückwärts (5/10m) [s]",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3/3",
//                 "color": "yellow"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "67.9/67.9",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Mundgesundheit",
//       "testsArr": [
//         [
//           {
//             "test_title": "Test",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/16.54/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "test"
//           }
//         ],
//         [
//           {
//             "test_title": "Test",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/16.54/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": "test"
//           }
//         ]
//       ]
//     },
//     {
//       "section_name": "Psychosoziale Faktoren",
//       "testsArr": [
//         [
//           {
//             "test_title": "Sportbezogene Unzufriedenheit",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "7.6",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "7",
//                 "color": "yellow"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Soziale Unterstützung im Sport",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "4",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "3.44",
//                 "color": "green"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Drop-Out-Gedanken",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "3",
//                 "color": "green"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Sportbezogener Stress",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "2.13",
//                 "color": "red"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "2.8",
//                 "color": "red"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "test",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "null/null",
//                 "color": "white"
//               }
//             ],
//             "show_values": true,
//             "show_thresholds": true,
//             "desc": ""
//           }
//         ],
//         [
//           {
//             "test_title": "Angst",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "3",
//                 "color": "green"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "3",
//                 "color": "green"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Kritische Lebensereignisse",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "1",
//                 "color": "red"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "1",
//                 "color": "red"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ],
//         [
//           {
//             "test_title": "Finanzielle Unsicherheit",
//             "ser": [
//               {
//                 "date": "2022-04-01",
//                 "value": "2.88",
//                 "color": "red"
//               },
//               {
//                 "date": "2023-04-01",
//                 "value": "2.13",
//                 "color": "red"
//               }
//             ],
//             "show_values": false,
//             "show_thresholds": true,
//             "desc": null
//           }
//         ]
//       ]
//     }
//   ]
// }

// class AvatarPdf extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state =  {
//             avatarlist: json_data,
//             sectionData: null,
//             };
//         // this.tableRef = React.createRef();
//         // this.fetchData = this.fetchData.bind(this);
//     }

//     componentDidMount() {
//         this.fetchData();
//       }

//     fetchData = async () => {
//       try {
//           const response = await fetch('https://inprove-sport.info/avatar/BhdYsskMxsTePaxTsd/getCachedAvatarElement');
//           const result = await response.json();
//           console.log("result.success : ", result.success);
//           console.log("result.data[0] : ", result.data[0]);
//           console.log("result.data[0].sections : ", result.data[0].sections);
//           if (result.success) {
//               this.setState({
//                   avatarlist: result.data[0].sections,
//                   json_data: result.data[0]
//               }, () => {
//                   console.log("Updated avatarlist: ", this.state.avatarlist);
//                   console.log("Updated json_data: ", this.state.json_data);

//                   const lastTableIndex = this.state.avatarlist.length - 1;
//                   if (lastTableIndex >= 0) {
//                       this.handleHover(this.state.avatarlist[lastTableIndex], lastTableIndex);
//                   }
  
//               });
//           }
//       }
//       catch (error) {
//           console.error('Error fetching data:', error);
//       }
//       console.log("avatarlist : ", this.state.avatarlist);
//       console.log("json_data : ", this.state.json_data);

//   };

//    render() {
//     const { avatarlist } = this.state;

//     if (!avatarlist || !avatarlist.sections || avatarlist.sections.length === 0) {
//       return (
//         <div>
//           <div className="avatargallery" id="avatargallery">
//             <p>Loading...</p>
//           </div>
//         </div>
//       );
//     }

//     const legendItems = {
//       'Blut/Mikrobiom/Ernährung': [
//         { color: '#9ec261', label: 'Grün = im Normbereich' },
//         { color: '#fae19d', label: 'Gelb = suboptimal' },
//         { color: '#c86658', label: 'Rot = auffällig' },
//         { color: '#619ec2', label: 'Blau = erhöht' },
//       ],
//       'Genetik': [
//         { color: '#9ec261', label: '0 = 0 weniger ,,optimale\'\' Ausprägung' },
//         { color: '#c86658', label: '100 = ,,optimale\'\' Ausprägung' },
//       ],
//       'Psychosoziale Aspekte': [
//         { color: '#9ec261', label: 'Grün = unauffällig' },
//         { color: '#fae19d', label: 'Gelb = leicht auffällig' },
//         { color: '#c86658', label: 'Rot = auffällig' },
//       ],
//       'Motorik & Kognition': [
//         { color: '#9ec261', label: 'Grün = überdurchschnittlich' },
//         { color: '#fae19d', label: 'Gelb = durchschnittlich' },
//         { color: '#c86658', label: 'Rot = unter durchschnittlich' },
//       ],
//     };

//     const legend = (
//       <div className="legend">
//         {Object.keys(legendItems).map((category, index) => (
//           <div key={index}>
//             <h5>{`Legende ${category}`}</h5>
//             <ul>
//               {legendItems[category].map((item, subIndex) => (
//                 <li key={subIndex}>
//                   <span
//                     className="legend-color"
//                     style={{
//                       display: 'inline-block',
//                       width: '20px',
//                       height: '20px',
//                       backgroundColor: item.color,
//                       marginRight: '5px'
//                     }}
//                   ></span>
//                   {item.label}
//                 </li>
//               ))}
//             </ul>
//             {index < Object.keys(legendItems).length - 1 && <br />}
//           </div>
//         ))}
//         {/* Additional item for "Grau" */}
//         <br />
//         <div className="legend-category">
//           <ul>
//             <li style={{ whiteSpace: 'nowrap' }}>
//               <span
//                 className="legend-color"
//                 style={{
//                   display: 'inline-block',
//                   width: '20px',
//                   height: '20px',
//                   backgroundColor: '#808080',
//                   marginRight: '5px'
//                 }}
//               ></span>
//               <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 25px)' }}>
//                 Grau = Ergebnis liegt noch nicht vor/keine Teilnahme
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     );

//     const sections = avatarlist.sections;
//     const halfLength = Math.ceil(sections.length / 2);

//     return (
//       <div>
//         <div className="two-column-layout">
//           <div className="column">
//             {sections.slice(0, halfLength).map((section, index) => (
//               <div key={index}>
//                 <div className="avatar-all-content">
//                   <span className="avatar-text-field" id={`text${index}`}>
//                     {section.section_name}
//                     <ColorBar data={json_data} sectionName={section.section_name} />
//                   </span>
//                 </div>
//                 <div className="table-container">
//                   <AthleteProfileTable
//                     data={json_data}
//                     section_name={section.section_name}
//                     // sectionData={section}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="column">
//             {sections.slice(halfLength).map((section, index) => (
//               <div key={index}>
//                 <div className="avatar-all-content">
//                   <span className="avatar-text-field" id={`text${index + halfLength}`}>
//                     {section.section_name}
//                     <ColorBar data={json_data} sectionName={section.section_name} />
//                   </span>
//                 </div>
//                 <div className="table-container">
//                   <AthleteProfileTable
//                     data={json_data}
//                     section_name={section.section_name}
//                     // sectionData={section}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="legend-column">
//             {legend}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default AvatarPdf;