# Helldive Helper

<img alt="logo" src="./public/favicon.ico" width="48" height="48">

Customize loadouts for your team in Helldivers 2 and share with your friends easily.

Built with Vue 3, Tailwind and love for democracy.

## How It Works

Select your loadout and click on the Copy Link button to generate a link which can be shared with other people. When the link is opened, the app loads the data contained within it.

## Storing Game Data

All data are stored directly in the code in the `data` directory in files such as `weapons.ts`, `stratagems.ts`, etc.

See an example of the data for grenades:

```ts
export const grenades = {
  FRAG: {
    archetype: 'STANDARD',
    displayName: 'G-6 Frag',
    default: true
  },
  HIGH_EXPLOSIVE: {
    archetype: 'STANDARD',
    displayName: 'G-12 High Explosive'
  },
  INCENDIARY: {
    archetype: 'STANDARD',
    displayName: 'G-10 Incendiary'
  }
  //   ...
}
```

Stats for items are not included at all because I want to keep the app as simple as possible and can't be bothered updating stats every time a patch is released (and there is no reliable central API to retrieve the data from).

## Creating and Parsing Links

Clicking on the Copy Link button encodes the current state (selected weapons, stratagems, etc.) in a base64 string containing the selected data included and generates a link containing this string as the `data` query parameter.

Example of the link containing the resulting `data` string:

```plaintext
helldivehelper.net?data=W1siU3F1YWQgTGVhZGVyIiwwLDIsMSw2MiwyNywxOSw0NywwLDMsMSw0LDIsMCwxXV0=
```

The actual data string prior to encoding it in base64 looks like this:

```plaintext
[["Squad Leader",0,2,1,62,27,19,47,0,3,1,4,2,0,1]]
```

As you can see, it is a 2D array containing within it one array per player.

In order to optimize the resulting link length, apart from player names, only indexes of the selected item (primary/secondary weapon, grenade, stratagems, etc.) in its related map (see the *Storing Data* section) is stored. Using this index for each item enables the state to be recreated from the data contained within the generated link by looking up the key at the specified index in the related map. Because the index refers to the position of the item in its map, the order of the items in the `data` layer can never be changed in order to prevent breaking backwards compatibility with existing links.

### Example

We will reuse the data string shown above, which looks as follows:

```plaintext
[["Squad Leader",0,2,1,62,27,19,47,0,3,1,4,2,0,1]]
```

The string contains a `0` at index `1` for the `Squad Leader` player. We know that position `1` in the player's array stores the index of the player's primary weapon. We therefore know that the player's selected primary weapon is the first key of the `weapons.primary` map.

The `weapons.primary` map looks like this:

```ts
export const weapons = {
  primary: {
    LIBERATOR: {
      displayName: 'AR-23 Liberator',
      default: true,
      archetype: 'AR'
    },
    LIBERATOR_CONCUSSIVE: {
      displayName: 'AR-23C Liberator Concussive',
      archetype: 'AR'
    },
    LIBERATOR_PENETRATOR: {
      displayName: 'AR-23P Liberator Penetrator',
      archetype: 'AR'
    }
  //   ...
  }
}
```

Calling `Object.keys()` on the `weapons.primary` map would therefore return the `LIBERATOR` as the first key. We know that this player has selected `LIBERATOR` as their primary weapon.
Note: As per [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), `Object.keys()` **should** return the keys of an object literal in the order they were added as long as they are string-like keys.

## Run Locally

1. Clone the repo
2.
       npm install
3.
       npm run dev
