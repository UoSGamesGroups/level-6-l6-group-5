#pragma strict

public var upgradeName: String;
public var upgradeDesc: String;
public var upgradeLevel: int;
public var woodCost: int;
public var clothCost: int;
public var metalCost: int;
public var wood: int;
public var cloth: int;
public var metal: int;
public var lockedColor: ColorBlock;
public var woodMulti: int;
public var clothMulti: int;
public var metalMulti: int;
public var woodImage: Image;
public var metalImage: Image;
public var clothImage: Image;
public var titleText: Text;
public var descText: Text;
public var levelText: Text;
public var woodText: Text;
public var clothText: Text;
public var metalText: Text;
public var upgradeButton: Button;
public var arrow: GameObject;

function Start()
{
	OnLoad();
}

function OnLoad () 
{
	wood = PlayerPrefs.GetInt("Wood");
	cloth = PlayerPrefs.GetInt("Cloth");
	metal = PlayerPrefs.GetInt("Metal");

	upgradeLevel = PlayerPrefs.GetInt(upgradeName);

	if(upgradeLevel == 0)
	{
		upgradeLevel = 1;
		PlayerPrefs.SetInt(upgradeName, 1);
	}

	woodCost = woodMulti * upgradeLevel;
	clothCost = clothMulti * upgradeLevel;
	metalCost = metalMulti * upgradeLevel;
}

function Update () 
{
	titleText.text = upgradeName;
	descText.text = upgradeDesc;
	levelText.text = "Current Level: " + upgradeLevel.ToString();
	
	woodText.text = woodCost.ToString();
	clothText.text = clothCost.ToString();
	metalText.text = metalCost.ToString();

	if(wood < woodCost)
	{
		woodImage.color = Color(0.2,0.2,0.2,1);
		woodText.color = Color.red;
	}
	else
	{
		woodImage.color = Color(0.6,0.6,0.6,1);
		woodText.color = Color.white;
	}

	if(metal < metalCost)
	{
		metalImage.color = Color(0.2,0.2,0.2,1);
		metalText.color = Color.red;
	}
	else
	{
		metalImage.color = Color(0.6,0.6,0.6,1);
		metalText.color = Color.white;
	}
	if(cloth < clothCost)
	{
		clothImage.color = Color(0.2,0.2,0.2,1);
		clothText.color = Color.red;
	}
	else
	{
		clothImage.color = Color(0.6,0.6,0.6,1);
		clothText.color = Color.white;
	}
}

function Upgrade () 
{
	wood = PlayerPrefs.GetInt("Wood");
	cloth = PlayerPrefs.GetInt("Cloth");
	metal = PlayerPrefs.GetInt("Metal");

	if(woodCost <= wood && clothCost <= cloth && metalCost <= metal)
	{
		wood = wood - woodCost;
		cloth = cloth - clothCost;
		metal = metal - metalCost;

		PlayerPrefs.SetInt("Wood", wood);
		PlayerPrefs.SetInt("Cloth", cloth);
		PlayerPrefs.SetInt("Metal", metal);

		PlayerPrefs.SetInt(upgradeName, upgradeLevel + 1);

		upgradeLevel += 1;

		woodCost = woodMulti * upgradeLevel;
		clothCost = clothMulti * upgradeLevel;
		metalCost = metalMulti * upgradeLevel;

		arrow.GetComponent(UpgradeArrow).UpgradeAvailable();

		var params = new System.Collections.Generic.Dictionary.<System.String,System.Object>();
		params.Add("Upgrades", upgradeLevel);
		var returnVal = Analytics.Analytics.CustomEvent(upgradeName, params);
		Debug.Log(returnVal);
	}
}

function CanPurchase()
{
	OnLoad();
	if(woodCost <= wood && clothCost <= cloth && metalCost <= metal)
	{
		return true;
	}
	else
	{
		return false;
	}
}