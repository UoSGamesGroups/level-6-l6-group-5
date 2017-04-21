#pragma strict

public var loot: GameObject;
public var wood: int;
public var cloth: int;
public var metal: int;
public var playerWood: int;
public var playerCloth: int;
public var playerMetal: int;
public var woodText: Text;
public var clothText: Text;
public var metalText: Text;
public var currentChests: int;
public var currentLevel: float; 
public var boss: GameObject[]; 
public var runOnce: boolean; 
public var currentBoss: int;
public var click: boolean; 
public var chest: Image; 
public var chestPlus: Text; 
public var chestFound: boolean; 

function Start()
{
	chestFound = (PlayerPrefs.GetInt("ChestCollected") !=0);
	boss = GameObject.FindGameObjectsWithTag("Boss");
	loot.SetActive(false);
}

function Update()
{
	if(Time.time > 1 && boss[0].GetComponent(Boss).dead && !runOnce) 
	{
		runOnce = true;
		LootAmounts();
	}

	if(click)
	{
		if(Input.GetMouseButtonUp(0))
		{
			Application.LoadLevel ("LevelSelect");
		}
	}
}

function LootAmounts()
{
	yield WaitForSeconds(2);

	if(!chestFound)
	{
		//chest.sprite = null;
		chest.color = Color(0,0,0,0);
		chestPlus.color = Color(0,0,0,0);
	}

	wood = Random.Range(3, 7);
	cloth = Random.Range(3, 7);	
	metal = Random.Range(3, 7);	

	loot.SetActive(true);
			
	woodText.text = "+" + wood;
	clothText.text = "+" + cloth;
	metalText.text = "+" + metal;

	playerWood = PlayerPrefs.GetInt("Wood");
	playerCloth = PlayerPrefs.GetInt("Cloth");
	playerMetal = PlayerPrefs.GetInt("Metal");

	currentLevel = PlayerPrefs.GetInt("currentLevel");
	currentBoss = PlayerPrefs.GetInt("CurrentBoss");
	
	Debug.Log("Current Level is " + currentLevel);

	PlayerPrefs.SetInt("Wood", wood + playerWood);
	PlayerPrefs.SetInt("Cloth", cloth + playerCloth);
	PlayerPrefs.SetInt("Metal", metal + playerMetal);

	currentChests = PlayerPrefs.GetInt("Zone"+ currentLevel);
	currentChests ++;
	PlayerPrefs.SetInt("Zone"+ currentLevel, currentChests);


	currentBoss ++;

	if(currentBoss >  2)
		currentBoss = 0;

	PlayerPrefs.SetInt("CurrentBoss", currentBoss);

	WaitAndLoad();
}

function WaitAndLoad ()
{
	//yield WaitForSeconds(1);
	click = true;
}