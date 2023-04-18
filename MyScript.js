// Define a function to get the list of rooms and display them on the page
async function getRooms() {
    // Make a request to the server to get the list of rooms
    const response = await fetch('/rooms');
    const rooms = await response.json();
  
    // Display the list of rooms on the page
    const roomList = document.getElementById('room-list');
    for (const room of rooms) {
      const roomElement = document.createElement('li');
      roomElement.textContent = room.name;
      roomList.appendChild(roomElement);
    }
  }
  
  // Define a function to display the map with the rooms
  function displayMap(rooms) {
    // Create a new map
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 37.7749, lng: -122.4194 } // Default center for San Francisco
    });
  
    // Add a marker for each room to the map
    for (const room of rooms) {
      const marker = new google.maps.Marker({
        position: { lat: room.latitude, lng: room.longitude },
        map,
        title: room.name
      });
    }
  }
  
  // Define a function to get the user's current location and calculate the distances to the rooms
  function findNearestRoom(rooms) {
    // Check if the browser supports geolocation
    if ('geolocation' in navigator) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
  
        // Calculate the distances to the rooms and find the nearest room
        let nearestRoom;
        let shortestDistance = Infinity;
        for (const room of rooms) {
          const roomLocation = { lat: room.latitude, lng: room.longitude };
          const distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, roomLocation);
          if (distance < shortestDistance) {
            nearestRoom = room;
            shortestDistance = distance;
          }
        }
  
        // Display the nearest room to the user
        const nearestRoomElement = document.getElementById('nearest-room');
        nearestRoomElement.textContent = nearestRoom.name;
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  
  // Call the functions to get the list of rooms, display the map, and find the nearest room
  getRooms()
    .then(rooms => displayMap(rooms))
    .then(rooms => findNearestRoom(rooms))
    .catch(error => console.error(error));
  