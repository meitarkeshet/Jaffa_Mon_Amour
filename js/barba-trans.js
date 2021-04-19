// Include Barba and Barba CSS in the project
import barba from '@barba/core';
import barbaCss from '@barba/css';

// Tell barba to use the CSS plugin
barba.use(barbaCss);

// Initiate Barba
barba.init();

transitions: [{
    name: "slide",
    sync: true,
    to: { namespace: ['slide'] },
    leave() {},
    enter() {}
}]