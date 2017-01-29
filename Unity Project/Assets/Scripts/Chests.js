#pragma strict

public class chest
{
	public var name: String;
	public var rarity: rarityStauses;
	public var type: types;
	public var zoneSpecific: boolean;
	public var zoneSpawn: int;
	public var texture: Material;
	public var mesh: Mesh;
	public var image: Sprite;
}

enum rarityStauses {Common, Uncommon, Rare, Legendary};
enum types {Sail, Wood, Pet};

public var chests: chest[]; 
public var highestLevel: int; 
public var chestObj: GameObject; 
public var panel: GameObject; 

function Start () 
{
	highestLevel = PlayerPrefs.GetInt("zoneUnlocked");

	for(var i: int = 1; i <= highestLevel; i++)
	{
		var levelTotalChests: int;
		levelTotalChests = PlayerPrefs.GetInt("Zone"+i);
		if(levelTotalChests > 0)
		{
			CreateChest(levelTotalChests, i);
		}
	}
}

function CreateChest (amount: int, level: int) 
{
	for(var i: int; i < amount; i++)
	{
		var createdChest = Instantiate(chestObj, transform.position, transform.rotation);
		createdChest.transform.parent = panel.transform;
		createdChest.GetComponent(Chest).chestLevel = level;
		createdChest.GetComponent(Chest).parent = this.gameObject;
		createdChest.GetComponent(Chest).ButtonStart();
	}
}