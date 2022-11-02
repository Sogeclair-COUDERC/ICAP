# Switch

Script pour l'insersion d'un Switch avec Label

Paramètres possible :

- className
- label
- handleChange : pour retour de changement de Status
- checkStatus : true ou false(default)
- disabled : true ou false(default)

## Basic example

```sh
// Items et library
import Switch from '../../components/forms/switch/Switch';
```

```sh
// Recuperation valeur Switch Button
    const [stateSwitch, setStateSwitch] = useState()
    const returnValueSwitch = (value) => {
        setStateSwitch(value)
    }
```

```sh
<Switch
    label='Switch label'
    checkStatus={true}
    disabled={false}
    handleChange={returnValueSwitch} />
```
