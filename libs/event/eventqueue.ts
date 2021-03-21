
class EventQueue{

    discoveryidcounter = 0
    idcounter = 0
    listeners:{id:number, type: string; cb: (data: any) => void; }[]
    events:{type:string,data:any}[]
    onProcessFinished = new EventSystem<any>()

    constructor(){
        this.listeners = []
        this.events = []
    }

    // listenDiscovery(type:string,megacb:(data:any,cb:(cbdata:any) => void) => void){
    //     this.listen(type,(dataAndCb:{data:any,cb:(ads:any) => void}) => {
    //         megacb(dataAndCb.data,dataAndCb.cb)
    //     })
    // }

    // startDiscovery(type:string,data: any, cb: (cbdata: any) => void) {
    //     this.addAndTrigger(type,{data,cb})
    // }


    listenDiscovery(type: string, cb: (data: any, id: any) => void) {
        this.listen(type,(discovery) => {
            cb(discovery.data,discovery.id)
        })
    }


    
    startDiscovery(type: string, data: any, cb: (cbdata: any) => void) {
        let createdid = this.discoveryidcounter++
        
        let listenerid = this.listen('completediscovery',(discovery:{data,id}) => {
            if(discovery.id == createdid){
                this.unlisten(listenerid)
                cb(discovery.data)
            }
        })
        this.addAndTrigger(type,{data,id: createdid})
    }

    completeDiscovery(data: any, id: any) {
        this.addAndTrigger('completediscovery',{data,id})
    }

    


    listen(type:string,cb:(data:any) => void){
        var id = this.idcounter++
        this.listeners.push({
            id:id,
            type: type,
            cb,
        })
        return id
    }

    listenOnce(type:string,cb:(data:any) => void){
        let id = this.listen(type,(data) => {
            this.unlisten(id)
            cb(data)
        })
        return id
    }

    unlisten(id:number){
        var index = this.listeners.findIndex(o => o.id == id)
        this.listeners.splice(index,1)
    }

    process(){
        while(this.events.length > 0){
            let current = this.events.shift()
            var listeners = this.listeners.filter(l => l.type == current.type)
            for(var listener of listeners){
                listener.cb(current.data)
            }
        }
        this.onProcessFinished.trigger(0)
    }
    
    add(type:string,data:any){
        this.events.push({
            type: type,
            data:data,
        })
    }

    addAndTrigger(type:string,data:any){
        this.add(type,data)
        this.process()
    }
}