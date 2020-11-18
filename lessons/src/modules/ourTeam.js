const ourTeam = () => {
  const command = document.getElementById('command');

  command.addEventListener('mouseover', event => {
    if (event.target.matches('.command__photo')) {
      event.target.src = event.target.dataset.img;
    }
  });

  command.addEventListener('mouseout', event => {
    if (event.target.matches('.command__photo')) {
      event.target.src = event.target.src.replace(/\d{1}a/, match => match.substring(0, 1));
    }
  });
};

export default ourTeam;