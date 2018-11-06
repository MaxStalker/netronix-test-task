let eventSource;

export const setupConnection = () => {
  eventSource = new EventSource('https://jsdemo.envdev.io/sse');
  eventSource.onmessage = function(e) {
    // Send actions here
  };
};

export const closeConnection = () => {
  eventSource.close();
};
