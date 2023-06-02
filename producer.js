const { Kafka } = require("kafkajs");
const msg = process.argv[2];
const partition = msg[0] < "N" ? 0 : 1;

const run = async () => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["kafka:9092"]
        });

        const producer = kafka.producer();
        console.log('connecting...');
        await producer.connect();
        console.log('connected');

        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })
        console.log(`sent successfully! ${JSON.stringify(result)}`);
        await producer.disconnect();
    } catch (error) {
        console.error(`something went wrong ${error}`);
    }
    finally {
        process.exit(0);
    }
}

run();