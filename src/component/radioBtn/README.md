# Radio Btn

Script pour l'insersion de Radio Button avec Label positionné

Paramètres possible :

- className
- label
- name : nom du groupe de radio button
- listRadio : {[
  { radioName: 'Lab radio 1', checked: true },
  { radioName: 'Lab radio 2' },
  { radioName: 'Lab radio 3' },
  { radioName: 'Lab radio 4', disabled: true }
  ]}

  - checked : true ou false(default)
  - disabled : true ou false(default)

- labelPosition : top bottom left right(default)
- handleChange : pour retour de changement de Status

## Basic example

```sh
// Items et library
import RadioBtn from '../../components/forms/radioBtn/RadioBtn';
```

```sh
// Recuperation valeur Radio Button
const [selectedRadio, setSelectedRadio] = useState()
const returnValueRadio = (value) => {
    setSelectedRadio(value)
}
```

```sh
<RadioBtn
    label='Label Liste Radio Btn default'
    className='radio_class'
    name='radio_name_group'
    disabled={false}
    listRadio={[
        { radioName: 'Lab radio 1', checked: true },
        { radioName: 'Lab radio 2' },
        { radioName: 'Lab radio 3' },
        { radioName: 'Lab radio 4', disabled: true }
    ]}
    handleChange={returnValueRadio} />
```
