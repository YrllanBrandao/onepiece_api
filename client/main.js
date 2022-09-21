

const character = document.getElementById('character');
const title = document.getElementById('title')


    const  url = `http://localhost:8080/character/zoro`
   

 const request =  fetch(url)
    .then((response) => response.json())
   .then(data => (data[0]));

console.table(request)

    
  
  

