const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} är obligatoriskt`;
  }
  return null;
};

const validatePostalCode = (postalCode) => {
  const requiredError = validateRequired(postalCode, 'Postnummer');
  if (requiredError) return requiredError;

  const cleanZip = String(postalCode).replace(/\s/g, '');
  //   Det här är en regex validering https://regex101.com/ här kan ni se lite mer om hur regex fungerar och testa olika strängar mot regexen
  if (!/^\d{5}$/.test(cleanZip)) {
    return 'Postnummer måste vara exakt fem siffror';
  }
  return null;
};

const validateMoveDate = (date) => {
  const requiredError = validateRequired(date, 'Flyttdatum');
  if (requiredError) return requiredError;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return 'Datum måste vara i formatet ÅÅÅÅ-MM-DD';
  }

  const [year, month, day] = date.split('-').map(Number);
  const moveDate = new Date(year, month - 1, day);

  // Fångar icke-existerande dagar (t.ex. 31 feb slår om till mars, 31 februari finns trots allt inte lol)
  if (moveDate.getMonth() !== month - 1 || moveDate.getDate() !== day) {
    return 'Ogiltigt datum';
  }

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  minDate.setDate(minDate.getDate() + 14);

  if (moveDate < minDate) {
    return 'Flyttdatum måste vara minst 14 dagar framåt i tiden';
  }

  return null;
};

const validateMove = (form = {}) => {
  return {
    address: validateRequired(form.address, 'Adress'),
    zip: validatePostalCode(form.zip),
    city: validateRequired(form.city, 'Stad'),
    date: validateMoveDate(form.date),
    contract: validateRequired(form.contract, 'Avtalstyp'),
  };
};

export default validateMove;
