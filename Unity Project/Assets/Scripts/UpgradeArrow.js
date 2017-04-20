#pragma strict

public var arrow: GameObject;

public var UIManager: MainMenuUIManager;
public var health: Upgrade;
public var damage: Upgrade;
public var accuracy: Upgrade;
public var reload: Upgrade;

function Start () 
{
	UIManager.GetComponent(MainMenuUIManager).OpenUpgradesPanel();
	UpgradeAvailable();
	//UIManager.GetComponent(MainMenuUIManager).CloseUI();
}

function UpgradeAvailable()
{
	var healthCanUpgrade: boolean;
	var damageCanUpgrade: boolean;
	var accuracyCanUpgrade: boolean;
	var reloadCanUpgrade: boolean;
	
	healthCanUpgrade = health.GetComponent(Upgrade).CanPurchase();

	damageCanUpgrade = damage.GetComponent(Upgrade).CanPurchase();

	accuracyCanUpgrade = accuracy.GetComponent(Upgrade).CanPurchase();

	reloadCanUpgrade = reload.GetComponent(Upgrade).CanPurchase();

	if(healthCanUpgrade || damageCanUpgrade || accuracyCanUpgrade || reloadCanUpgrade)
	{
		arrow.SetActive(true);
	}
	else
	{
		arrow.SetActive(false);
	}
}