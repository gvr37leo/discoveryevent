/// <reference path="libs/vector/vector.ts" />
/// <reference path="libs/utils/rng.ts" />
/// <reference path="libs/utils/store.ts" />
/// <reference path="libs/utils/table.ts" />
/// <reference path="libs/utils/utils.ts" />
/// <reference path="libs/utils/stopwatch.ts" />
/// <reference path="libs/utils/ability.ts" />
/// <reference path="libs/utils/anim.ts" />
/// <reference path="libs/rect/rect.ts" />
/// <reference path="libs/event/eventqueue.ts" />
/// <reference path="libs/event/eventsystem.ts" />



var queue = new EventQueue()

//ergens in de code doet iets triggerdiscovery

//iets kan luisteren naar triggerdiscovery
//en krijgt dan de opties binnen en kan of direct de callback aanspreken(goed genoeg voor lokaal)
//of een new event creeeren met discovery id van het originele event en die terugsturen en dat discovery ding daar naar laten luisteren en de data doorgeven naar de callback(voor multiplayer)


// queue.listenDiscovery('discover',(data,cb) => {

//     cb(data.options[1])

//     // modal.show(data,(chosen) => {
//     //     cb(chosen)
//     // })
// })

// queue.startDiscovery('discover',{options:[1,2,3,4]}, (cbdata) => {
//     console.log(cbdata)
// })




queue.listenDiscovery('discoverhouse',(data,id) => {

    setTimeout(() => {
        queue.completeDiscovery(data.options[0],id)
    },1000)
    
})


queue.startDiscovery('discoverhouse',{options:[1,2,3,4]}, (cbdata) => {
    console.log(cbdata)
})

