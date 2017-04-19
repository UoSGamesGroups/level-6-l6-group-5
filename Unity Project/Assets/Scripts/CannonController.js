#pragma strict

public var normalCannon: GameObject;
public var fireCannon: GameObject;
public var heavyCannon: GameObject;
public var slowCannon: GameObject;
public var normalOutline: GameObject;
public var fireOutline: GameObject;
public var heavyOutline: GameObject;
public var slowOutline: GameObject;
public var fireShots: int;
public var heavyShots: int;
public var slowShots: int;
public var fireAmmoCounter: TextMesh;
public var heavyAmmoCounter: TextMesh;
public var slowAmmoCounter: TextMesh;

public var normalAnim: Animator;
public var fireAnim: Animator;
public var heavyAnim: Animator;
public var slowAnim: Animator;

function Start () 
{
	fireShots = PlayerPrefs.GetInt("PowerUp1");
	heavyShots = PlayerPrefs.GetInt("PowerUp2");
	slowShots = PlayerPrefs.GetInt("PowerUp3");
	normalAnim.SetBool("Selected", true);
	
	UpdateAmmo();
}

function Selected () 
{
	normalCannon.GetComponent(Cannon).selected = false;
	fireCannon.GetComponent(Cannon).selected = false;
	heavyCannon.GetComponent(Cannon).selected = false;
	slowCannon.GetComponent(Cannon).selected = false;
}

function Update()
{
	PlayerPrefs.SetInt("PowerUp1", fireShots);
	PlayerPrefs.SetInt("PowerUp2", heavyShots);
	PlayerPrefs.SetInt("PowerUp3", slowShots);

	fireAmmoCounter.text = fireShots.ToString();
	heavyAmmoCounter.text = heavyShots.ToString();
	slowAmmoCounter.text = slowShots.ToString();
}

function UpdateAmmo()
{
	normalAnim.SetBool("Up", true);
	normalCannon.GetComponent(Cannon).hasAmmo = true;
	
	if(fireShots > 0)
	{
		//fireCannon.SetActive(true);
		//fireOutline.SetActive(true);
		fireCannon.GetComponent(Cannon).hasAmmo = true;
		fireAnim.SetBool("Up", true);
	}
	else
	{
		//fireCannon.SetActive(false);
		//fireOutline.SetActive(false);
		fireCannon.GetComponent(Cannon).hasAmmo = false;
		fireAnim.SetBool("Down", true);
	}

	if(heavyShots > 0)
	{
		//heavyCannon.SetActive(true);
		//heavyOutline.SetActive(true);
		heavyCannon.GetComponent(Cannon).hasAmmo = true;
		heavyAnim.SetBool("Up", true);
	}
	else
	{
		//heavyCannon.SetActive(false);
		//heavyOutline.SetActive(false);
		heavyCannon.GetComponent(Cannon).hasAmmo = false;
		heavyAnim.SetBool("Down", true);
	}

	if(slowShots > 0)
	{
		//slowCannon.SetActive(true);
		//slowOutline.SetActive(true);
		slowCannon.GetComponent(Cannon).hasAmmo = true;
		slowAnim.SetBool("Up", true);
	}
	else
	{
		//slowCannon.SetActive(false);
		//slowOutline.SetActive(false);
		slowCannon.GetComponent(Cannon).hasAmmo = false;
		slowAnim.SetBool("Down", true);
	}
}