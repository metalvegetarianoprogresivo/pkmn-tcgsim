import { PkmnCard } from "./boardStateUpdate"

const ragingboltex: PkmnCard = {
    "id": "sv5-123",
    "name": "Raging Bolt ex",
    "supertype": "Pokémon",
    "subtypes": ["Basic", "ex", "Ancient"],
    "hp": 240,
    "types": ["Dragon"],
    "rules": ["Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."],
    "attacks": [
        {
            "name": "Burst Roar",
            "cost": ["Colorless"],
            "convertedEnergyCost": 1,
            "damage": "",
            "text": "Discard your hand and draw 6 cards."
        }, {
            "name": "Bellowing Thunder",
            "cost": ["Lightning", "Fighting"],
            "convertedEnergyCost": 2,
            "damage": "70×",
            "text": "You may discard any amount of Basic Energy from your Pokémon. This attack does 70 damage for each card you discarded in this way."
        }
    ],
    "retreatCost": ["Colorless", "Colorless", "Colorless"],
    "convertedRetreatCost": 3,
    "set": {
        "id": "sv5",
        "name": "Temporal Forces",
        "series": "Scarlet & Violet",
        "printedTotal": 162,
        "total": 218,
        "legalities": { "unlimited": "Legal", "standard": "Legal", "expanded": "Legal" },
        "ptcgoCode": "TEF",
        "releaseDate": "2024/03/22",
        "updatedAt": "2024/03/22 15:00:00",
        "images": { "symbol": "https://images.pokemontcg.io/sv5/symbol.png", "logo": "https://images.pokemontcg.io/sv5/logo.png" }
    },
    "number": "123",
    "artist": "aky CG Works",
    "rarity": "Double Rare",
    "legalities": { "unlimited": "Legal", "standard": "Legal", "expanded": "Legal" },
    "regulationMark": "H",
    "images": { "small": "https://images.pokemontcg.io/sv5/123.png", "large": "https://images.pokemontcg.io/sv5/123_hires.png" },
    gameStatus: {
        used: false,
        damage: 0,
        posioned: false,
        burned: false,
        additionalHP: 0,
        additionalRetrear: 0,
        additionalAttackCost: 0,
        additionalAttackValue: 0,
        knockout: false,
        canAttack: false,
        canRetreat: false,
        canNotUseAttacks: [],
        canUseAbilities: false,
        energyAttached: [],
        toolsAttached: [],
    }
};

const LEnergy: PkmnCard = {
    "id": "sv1-257",
    "name": "Basic Lightning Energy",
    "supertype": "Energy",
    "subtypes": ["Basic"],
    "set": {
        "id": "sv1",
        "name": "Scarlet & Violet",
        "series": "Scarlet & Violet",
        "printedTotal": 198,
        "total": 258,
        "legalities": { "unlimited": "Legal", "standard": "Legal", "expanded": "Legal" },
        "releaseDate": "2023/03/31",
        "updatedAt": "2023/03/31 15:45:00",
        "images": { "symbol": "https://images.pokemontcg.io/sv1/symbol.png", "logo": "https://images.pokemontcg.io/sv1/logo.png" }
    },
    "number": "257",
    "rarity": "Hyper Rare",
    "legalities": { "unlimited": "Legal", "standard": "Legal", "expanded": "Legal" },
    "images": { "small": "https://images.pokemontcg.io/sv1/257.png", "large": "https://images.pokemontcg.io/sv1/257_hires.png" },
};

const FEnergy: PkmnCard = {
    "id": "sv1-258",
    "name": "Basic  Fighting Energy",
    "supertype": "Energy",
    "subtypes": ["Basic"],
    "set": {
        "id": "sv1",
        "name": "Scarlet & Violet",
        "series": "Scarlet & Violet",
        "printedTotal": 198,
        "total": 258,
        "legalities": { "unlimited": "Legal", "standard": "Legal", "expanded": "Legal" },
        "releaseDate": "2023/03/31",
        "updatedAt": "2023/03/31 15:45:00",
        "images": { "symbol": "https://images.pokemontcg.io/sv1/symbol.png", "logo": "https://images.pokemontcg.io/sv1/logo.png" }
    },
    "number": "258",
    "rarity": "Hyper Rare",
    "legalities": { "unlimited": "Legal", "standard": "Legal", "expanded": "Legal" },
    "images": { "small": "https://images.pokemontcg.io/sv1/258.png", "large": "https://images.pokemontcg.io/sv1/258_hires.png" },
};

const deck: PkmnCard[] = [
    ragingboltex, ragingboltex, ragingboltex, ragingboltex, 
    LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy,
    LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy, LEnergy,
    FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy,
    FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy, FEnergy,
]

export default deck;
