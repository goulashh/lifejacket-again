/*
Global Event Bus.
Used to 'bubble' events up to higher components as a useful feature.

Code inspired by Envanto Tuts+
    https://www.youtube.com/watch?v=1GNsWa_EZdw
Video including code can be found here at 2:33:00.
*/

const events = new Map();

export default {
    $on(eventName, fn) {
        if(!events.has(eventName)) {
            events.set(eventName, []);
        }
        events.get(eventName).push(fn);
    },
    $off(eventName, fn) {
        if (!events.has(eventName)) return; // If the event doesn't exist, do nothing

        const listeners = events.get(eventName);
        // Remove the specified listener
        const index = listeners.indexOf(fn);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    },
    $emit(eventName, data) {
        if(events.has(eventName)) { 
            events.get(eventName).forEach(fn => fn(data));
        }
    }
};