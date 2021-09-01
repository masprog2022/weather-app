document.querySelector('.busca').addEventListener('submit', async (Event)=>{
    Event.preventDefault();

    let input = document.querySelector('#searchInput').value;


    if(input !== ''){
        clearInfo();
      showWarning('Carregando...')
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`
    
      let results = await fetch(url);
      let json = await results.json();

      if(json.cod === 200){
        
       showInfo({
           name: json.name,
           country: json.sys.country,
           temp: json.main.temp,
           tempIcon: json.weather[0].icon,
           windSpeed: json.wind.speed,
           windAngle: json.wind.deg


       });

      }else{
          clearInfo();
          showWarning('Nao encontramos esta localizacao.');
      }
    }else{
        clearInfo();
    }
    
});

function showInfo(json){
  showWarning('');

  document.querySelector('.resultado').style.display = 'block';
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}
