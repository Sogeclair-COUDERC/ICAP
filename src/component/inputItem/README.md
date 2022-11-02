# InputItem

Script pour l'insertion d'un Input avec ou sans Label ou Alerte

Paramètres possibles :

- className add personnal className
- label
- type: text / number / search / password / ..
- value
- placeholder value(default)
- validation : true false(default)
- alertMessage : change AlertMessage - "Ce champ est obligatoire !"(default)
- footLabel
- handleChange : pour retour de changement de value

## Basic example

```sh
// Items et library
import InputItem from '../../components/forms/inputItem/InputItem';
```

```sh

```

```sh
<InputItem
    className='nouvelInput'
    label='Mon Label'
    type='password'
    validation='true'
    placeholder='texte par default'
    alertMessage = "Merci de compléter le champ"
    footLabel='Foooter Label'
    handleChange={(e) => handleChange(e)}/>
```
