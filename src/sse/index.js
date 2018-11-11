class EventSourceConnection {
  constructor(url, processor) {
    console.log('Establish connection');
    this.connection = new EventSource(url);
    if (processor) {
      this.bindProcessor(processor);
    }
  }

  bindProcessor(processor) {
    console.log('Assign processor');
    this.connection.onmessage = processor;
  }

  closeConnection() {
		console.log('Connection closed');
    this.closeConnection();
  }
}

export default EventSourceConnection;
