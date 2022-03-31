import Floor from '../World/Floor'
import { v4 as uuidv4 } from 'uuid';

import { EFFECTS } from '../Utils/Enums';
import Jimbo from '../World/Titles/Jimbo';
import JimboLight from '../World/Titles/JimboLight';
import WitherberryLogo from '../World/Logo/Witherberry';
import JimboLight2 from '../World/Titles/JimboLight2';
import JimboLight3 from '../World/Titles/JimboLight3';
import JimboLight4 from '../World/Titles/JimboLight4';

export function addTimelineEvents_intro(timeline) {

    timeline[uuidv4()] = {
        effect: {
            name: EFFECTS.FROM_TO,
            properties: [
                {
                    path: 'position',
                    from: {
                        x: 0,
                        y: -3,
                        z: 2
                    },
                    to: {
                        x: 0,
                        y: -3,
                        z: 2
                    }
                },
                {
                    path: 'scale',
                    from: {
                        x: 0.7,
                        y: 0.7,
                        z: 0.7
                    },
                    to: {
                        x: 0.7,
                        y: 0.7,
                        z: 0.7
                    }
                },
                {
                    path: 'rotation',
                    from: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    to: {
                        x: 0,
                        y: 0,
                        // y: Math.PI * 2,
                        z: 0
                    }
                }
            ],
            startAt: 0,
            endAt: 1.25
        },
        started: false,
        theClass: WitherberryLogo
    }

    timeline[uuidv4()] = {
        effect: {
            name: EFFECTS.FROM_TO,
            properties: [
                {
                    path: 'mesh.scale',
                    from: {
                        x: 4,
                        y: 4,
                        z: 4
                    },
                    to: {
                        x: 4,
                        y: 4,
                        z: 4
                    }
                },
                {
                    path: 'mesh.position',
                    from: {
                        x: 0,
                        y: 2,
                        z: 2
                    },
                    to: {
                        x: 0,
                        y: 2,
                        z: 2
                    }
                }
            ],
            startAt: 0,
            endAt: 1.25
        },
        started: false,
        theClass: Jimbo
    }

    timeline[uuidv4()] = {
        effect: {
            name: EFFECTS.FROM_TO,
            properties: [{
                path: 'light.scale',
                from: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                to: {
                    x: 1,
                    y: 1,
                    z: 1
                }
            }],
            startAt: 0,
            endAt: 1.25
        },
        started: false,
        theClass: JimboLight
    }

    timeline[uuidv4()] = {
        effect: {
            name: EFFECTS.FROM_TO,
            properties: [{
                path: 'light.scale',
                from: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                to: {
                    x: 1,
                    y: 1,
                    z: 1
                }
            }],
            startAt: 0,
            endAt: 1.25
        },
        started: false,
        theClass: JimboLight2
    }

    timeline[uuidv4()] = {
        effect: {
            name: EFFECTS.FROM_TO,
            properties: [{
                path: 'light.scale',
                from: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                to: {
                    x: 1,
                    y: 1,
                    z: 1
                }
            }],
            startAt: 0,
            endAt: 1.25
        },
        started: false,
        theClass: JimboLight3
    }

    timeline[uuidv4()] = {
        effect: {
            name: EFFECTS.FROM_TO,
            properties: [{
                path: 'light.scale',
                from: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                to: {
                    x: 1,
                    y: 1,
                    z: 1
                }
            }],
            startAt: 0,
            endAt: 1.25
        },
        started: false,
        theClass: JimboLight4
    }

    // timeline[uuidv4()] = {
    //     effect: {
    //         name: EFFECTS.FROM_TO,
    //         properties: [{
    //             path: 'light.scale',
    //             from: {
    //                 x: 1,
    //                 y: 1,
    //                 z: 1
    //             },
    //             to: {
    //                 x: 1,
    //                 y: 1,
    //                 z: 1
    //             }
    //         }],
    //         startAt: 0,
    //         endAt: 1.25
    //     },
    //     started: false,
    //     theClass: AmbientLight
    // }

    timeline[uuidv4()] = {
        effect: {
            name: EFFECTS.FROM_TO,
            properties: [{
                path: 'mesh.scale',
                from: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                to: {
                    x: 2,
                    y: 2,
                    z: 2
                }
            }],
            startAt: 1.25,
            endAt: 17
        },
        started: false,
        theClass: Floor
    }

}