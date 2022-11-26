const getUserLang = () => {
	  const lang = navigator.language;
       //if russian return ru else en
	  return lang === 'ru' ? 'ru' : 'en';
};

export default getUserLang;
