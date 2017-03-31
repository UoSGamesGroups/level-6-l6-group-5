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
	public var owned: boolean;
}

enum rarityStauses {Common, Uncommon, Rare, Legendary};
enum types {Sail, Wood, Pet};

public var chests: chest[]; 
public var highestLevel: int; 
public var chestObj: GameObject; 
public var panel: GameObject; 
public var button: GameObject; 
public var chestOpening: boolean; 
public var chestsList: List.<GameObject>; 

function Start () 
{
	highestLevel = PlayerPrefs.GetInt("zoneUnlocked");
	
	SetUnlocked();
	
	for(var i: int = 1; i <= highestLevel; i++)
	{
		var levelTotalChests: int;
		levelTotalChests = PlayerPrefs.GetInt("Zone" + i);
		if(levelTotalChests > 0)
		{
			CreateChest(levelTotalChests, i);
		}
	}
}

function Refresh()
{
	SetUnlocked();

	for(var i: int; i < chestsList.Count; i++)
	{
		chestsList.Item[i].GetComponent(Chest).update = true;
	}
}

function SetUnlocked()
{
	for(var i: int; i < chests.Length; i++)
	{
		var open: int;

		if(chests[i].type.ToString() == "Sail")
		{
			open = PlayerPrefs.GetInt(chests[i].name + "Sail");
		}
		else if(chests[i].type.ToString() == "Wood")
		{
			open = PlayerPrefs.GetInt(chests[i].name + "Wood");
		}
		else if(chests[i].type.ToString() == "Pet")
		{
			open = PlayerPrefs.GetInt(chests[i].name + "Pet");
		}

		if(open == 1)
		{
			chests[i].owned = true;
		}
	}
}

function Update()
{
	if(chestOpening)
	{
		button.GetComponent(ShowPanel).ChestOpened();
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
		createdChest.GetComponent(Chest).parent = this.gameObject;
		createdChest.GetComponent(Chest).ButtonStart();
		chestsList.Add(createdChest);
	}
}