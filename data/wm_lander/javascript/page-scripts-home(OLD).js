// JavaScript Document

pulloutHeight = -60;
function pulloutForm()
{
	if (pulloutHeight != 0)
	{
		pulloutHeight = pulloutHeight + 5;
		document.getElementById("fixedPullout").style.marginTop = pulloutHeight + 'px';
		setTimeout("pulloutForm()", 20);
	}
}
function closePulloutForm()
{
	if (pulloutHeight != -60)
	{
		pulloutHeight = pulloutHeight - 5;
		document.getElementById("fixedPullout").style.marginTop = pulloutHeight + 'px';
		setTimeout("closePulloutForm()", 20);
	}
}

switchSubVar = "no";
switchSubVar2 = " ";
function showSubMenu(switchSubVar,switchSubVar2,switchSubVar3)
{
	if (switchSubVar == "Submenu 1")
	{
		document.getElementById("shopDepartmentSub").style.display = "block";
		document.getElementById("shopDepartmentBtn").style.backgroundColor = "#556c79";
		
		document.getElementById("shopProductBtn").style.backgroundColor = "#efefef";
		document.getElementById("shopProductSub").style.display = "none";
		
		if (switchSubVar2 >= 1)
		{
			for (e=1;e<=9;e++)
			{
				document.getElementById('departmentSubBtn1-' + e).style.backgroundColor = "#eeeeee";
				if (e != 9)
				{
					document.getElementById('departmentSubBtn2-' + e).style.display = "none";
				}
			}
			document.getElementById('departmentSubBtn1-' + switchSubVar2).style.backgroundColor = "#dee5e9";
			if (switchSubVar2 != 9)
			{
				document.getElementById('departmentSubBtn2-' + switchSubVar2).style.display = "block";
			}
			if (switchSubVar3 >= 1)
			{
				for (e=1;e<=11;e++)
				{
					document.getElementById('departmentSubBtn2-' + switchSubVar2 + '-' + e).style.backgroundColor = "#eeeeee";
					document.getElementById('departmentSubBtn3-' + switchSubVar2 + '-' + e).style.display = "none";
				}
				document.getElementById('departmentSubBtn2-' + switchSubVar2 + '-' + switchSubVar3).style.backgroundColor = "#dee5e9";
				document.getElementById('departmentSubBtn3-' + switchSubVar2 + '-' + switchSubVar3).style.display = "block";
			}
		}
	}
	else if (switchSubVar == "Submenu 2")
	{
		document.getElementById("shopProductBtn").style.backgroundColor = "#f4f4f4";
		document.getElementById("shopProductSub").style.display = "block";
		
		for (e=1;e<=9;e++)
		{
			document.getElementById('departmentSubBtn1-' + e).style.backgroundColor = "#eeeeee";
			if (e != 9)
			{
				document.getElementById('departmentSubBtn2-' + e).style.display = "none";
			}
		}
		for (e=1;e<=11;e++)
		{
			document.getElementById('departmentSubBtn2-8-' + e).style.backgroundColor = "#eeeeee";
			document.getElementById('departmentSubBtn3-8-' + e).style.display = "none";
		}
	}
	else
	{
		document.getElementById("shopProductBtn").style.backgroundColor = "#efefef";
		document.getElementById("shopProductSub").style.display = "none";
		
		for (e=1;e<=9;e++)
		{
			document.getElementById('departmentSubBtn1-' + e).style.backgroundColor = "#eeeeee";
			if (e != 9)
			{
				document.getElementById('departmentSubBtn2-' + e).style.display = "none";
			}
		}
		for (e=1;e<=11;e++)
		{
			document.getElementById('departmentSubBtn2-8-' + e).style.backgroundColor = "#eeeeee";
			document.getElementById('departmentSubBtn3-8-' + e).style.display = "none";
		}
	}
}
searchTermBase = "Lighting-Fixtures"
keywordSearchTerm = "";
searchPathVar = "Lighting-Fixtures";
function changeSearchTerm(searchTermTitle,searchTermVar)
{
	searchTermBase = searchTermVar;
	document.getElementById("shopProductBtn").innerHTML = searchTermTitle;
}
function enterKeyword(keywordVar)
{
	if (keywordVar != "Enter keyword or item number")
	{
		keywordSearchTerm = '?itemNumVal=' + keywordVar;
	}
	if (keywordVar == "Enter keyword or item number")
	{
		keywordSearchTerm = "";
	}
}
function searchNow()
{
	searchPathVar = '/' + searchTermBase + keywordSearchTerm;
	window.location = searchPathVar;
}
function newsletterSubmit(submitFormNum)
{
	document.forms['newsletterSignup' + submitFormNum].submit();
}