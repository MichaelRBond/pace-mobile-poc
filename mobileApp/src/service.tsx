export interface BroadcastedEvent{
    id: number;
    subject: String;
    body:  String;
    date: number,
    expiration_date: number,
    start_time: number,
    end_time: number,
}

class Service{
    constructor(){

    }

    public fetchCommunications() {
        let test =  {
            meta:{
                status:200,
                time:0
            },
            broadCastedEvents:[
                {
                    id: 1,
                    subject: "Test Title",
                    body: "This is a body of text",
                    date: 1570640984,
                    expiration_date: 1570640984 + 60*60*24*7,
                    start_time: 1570640984 + 60*60*24*3,
                    end_time:1570640984 + 60*60*24*3 + 60*60*2,
                } ,
                {
                    id: 2,
                    subject: "Test Title1",
                    body: "This is a body of text",
                    date: 1570640984,
                    expiration_date: 1570640984 + 60*60*24*7,
                    start_time: 1570640984 + 60*60*24*3,
                    end_time:1570640984 + 60*60*24*3 + 60*60*2,
                },
                {
                    id: 3,
                    subject: "Test Title2",
                    body: "This is a body of text",
                    date: 1570640984,
                    expiration_date: 1570640984 + 60*60*24*7,
                    start_time: 1570640984 + 60*60*24*3,
                    end_time:1570640984 + 60*60*24*3 + 60*60*2,
                }
            ] 

        };
        return test.broadCastedEvents as Array<BroadcastedEvent>;
    }
}

export default Service;