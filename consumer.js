const { Kafka } = require("kafkajs");



const run = async () => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["kafka:9092"]
        });

        const consumer = kafka.consumer({"groupId": "test"});
        console.log('connecting...');
        await consumer.connect();
        console.log('connected');

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        });

        await consumer.run({
            "eachMessage": async result => {
                console.log(`received message ${result.message.value} on partition ${result.partition}`)
            }
        })

    } catch (error) {
        console.error(`something went wrong ${error}`);
    }
    finally {
      
    }
}

run();