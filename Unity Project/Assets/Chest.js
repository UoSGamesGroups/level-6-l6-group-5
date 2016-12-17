#pragma strict
import System.Collections.Generic;

public var chestLevel: int;
public var parent: GameObject;
public var legendaryCollectables: List.<String>;
public var rareCollectables: List.<String>;
public var uncommonCollectables: List.<String>;
public var commonCollectables: List.<String>;
public var lengendaryChance: int;
public var rareChance: int;
public var uncommonChance: int;
public var commonChance: int;
public var randomRank: int;
public var ranomItem: int;

function Start () 
{
	for(var i: int; i < parent.GetComponent(Chests).chests.Length; i++)
	{
		if(!parent.GetComponent(Chests).chests[i].zoneSpecific)
		{
			AddToList(parent.GetComponent(Chests).chests[i].name, parent.GetComponent(Chests).chests[i].rarity.ToString());
		}
		else if(parent.GetComponent(Chests).chests[i].zoneSpawn == chestLevel && parent.GetComponent(Chests).chests[i].zoneSpecific)
		{
			AddToList(parent.GetComponent(Chests).chests[i].name, parent.GetComponent(Chests).chests[i].rarity.ToString());
		}
	}
}

function AddToList(collectionName: String, rarity: String) 
{
	switch(rarity)
	{
		case "Legendary": legendaryCollectables.Add(collectionName);
							break;
		case "Rare": rareCollectables.Add(collectionName);
							break;
		case "Uncommon": uncommonCollectables.Add(collectionName);
							break;
		case "Common": commonCollectables.Add(collectionName);
							break;
	}
}

function Clicked()
{
	randomRank = Random.Range(0,100);

	if(randomRank <= commonChance)
	{
		//Random from possible common items
	}
	else if(randomRank > commonChance && randomRank <= uncommonChance)
	{
		//Random from possible uncommon items
	}
	else if(randomRank > uncommonChance && randomRank <= rareChance)
	{
		//Random from possible rare items
	}
	else if(randomRank > rareChance && randomRank <= lengendaryChance)
	{
		//Random from possible legendary items
	}
}