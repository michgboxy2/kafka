const { Kafka } = require("kafkajs");

const run = async () => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["kafka:9092"]
        });

        const admin = kafka.admin();
        console.log('connecting...');
        await admin.connect();
        console.log('connected');

        //A-M, N-2
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2,
            }]
        });
        console.log("created successfully");
        await admin.disconnect();
    } catch (error) {
        console.error(`something went wrong ${error}`);
    }
    finally {
        process.exit(0);
    }
}

run();