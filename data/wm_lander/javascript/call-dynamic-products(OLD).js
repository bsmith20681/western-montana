gGetData(false,'items',{ limit:2, attribute:'HP Top Spots 1 and 2' }, grabAttribute);
            
            function grabAttribute()
            {
                document.getElementById('dynamicBoxHolder1').innerHTML = '';
                totalNum = count(gDataArray["items"]);
                for (var e in gDataArray["items"])
                {
                    productName =  gDataArray["items"][e]["ItemName"];
                    productSKU = gDataArray["items"][e]["InternalItemID"];
					productSKU2 = gDataArray["items"][e]["ItemNum"];
                    productURL = '/SKU-' + productSKU;
                    vendorIdVar = gDataArray["items"][e]["VendorID"];
					vendorNameVar = gDataArray["items"][e]["bName"];
                    productImageName = gDataArray["items"][e]["ImageName"];
                    productPrice = gDataArray["items"][e]["cbpPrice"]["price"];
                    productStockNum = gDataArray["items"][e]["cbpPrice"]["InStock"];
                    productIDVar = gDataArray["items"][e]["ItemID"];
                    productItemNum = gDataArray["items"][e]["ItemNum"];
                    
                    if (productStockNum == null)
                    {
                        productStockNum = "Not Available";
                    }
                    //alert(productIDVar +' - '+ vendorIdVar +' - '+ productItemNum);
                    //dump(gDataArray["items"]);
                    
                    document.getElementById('dynamicBoxHolder1').innerHTML += 
                    '<a href="'+ productURL +'">' +
						'<div class="dynamicBigBox">' +
							'<div class="overlayBanner"><img src="/lighting-data/homepage_images/banner-status_images/10percent_banner.png"></div>' +
							'<div class="dynamicProductBorder">' +
								'<div class="dynamicBigContainer">' +
									'<div class="dynamicBigImg">' +
										'<img src="/vendors/'+ vendorIdVar +'/small/' + productImageName +'" />' +
									'</div>' +
									'<div style="clear:both;"></div>' +
								'</div>' +
								'<div class="dynamicBigContainer">' +
									'<div class="dynamicBigPrice">$'+ productPrice +'</div>' +
									'<div class="dynamicBigBtn">View Product</div>' +
									'<div style="clear:both;"></div>' +
								'</div>' +
								'<div class="dynamicBigContainer">' +
									'<div class="dynamicBigSalePrice"></div>' +
									'<div class="dynamicBigSku">'+ vendorNameVar +' '+ productSKU2 +'</div>' +
									'<div class="dynamicBigTitle">'+ productName +'</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</a>';
                }
				document.getElementById('dynamicBoxHolder1').innerHTML +='<div style="clear:both;"></div>';
				
				gGetData(false,'items',{ limit:1, attribute:'HP Top Spot 3' }, grabAttribute2);
            }
			
			function grabAttribute2()
            {
                document.getElementById('dynamicBoxHolder2').innerHTML = '';
                totalNum = count(gDataArray["items"]);
                for (var e in gDataArray["items"])
                {
                    productName =  gDataArray["items"][e]["ItemName"];
                    productSKU = gDataArray["items"][e]["InternalItemID"];
					productSKU2 = gDataArray["items"][e]["ItemNum"];
                    productURL = '/SKU-' + productSKU;
                    vendorIdVar = gDataArray["items"][e]["VendorID"];
					vendorNameVar = gDataArray["items"][e]["bName"];
                    productImageName = gDataArray["items"][e]["ImageName"];
                    productPrice = gDataArray["items"][e]["cbpPrice"]["price"];
                    productStockNum = gDataArray["items"][e]["cbpPrice"]["InStock"];
                    productIDVar = gDataArray["items"][e]["ItemID"];
                    productItemNum = gDataArray["items"][e]["ItemNum"];
                    
                    if (productStockNum == null)
                    {
                        productStockNum = "Not Available";
                    }
                    //alert(productIDVar +' - '+ vendorIdVar +' - '+ productItemNum);
                    //dump(gDataArray["items"]);
                    
                    document.getElementById('dynamicBoxHolder2').innerHTML += 
                    '<a href="'+ productURL +'">' +
						'<div class="dynamicBigBox">' +
							'<div class="overlayBanner"><img style="margin-left:-5px; margin-top:-15px;" src="/lighting-data/homepage_images/banner-status_images/popular_banner.png"></div>' +
							'<div class="dynamicProductBorder">' +
								'<div class="dynamicBigContainer">' +
									'<div class="dynamicBigImg">' +
										'<img src="/vendors/'+ vendorIdVar +'/small/' + productImageName +'" />' +
									'</div>' +
									'<div style="clear:both;"></div>' +
								'</div>' +
								'<div class="dynamicBigContainer">' +
									'<div class="dynamicBigPrice">$'+ productPrice +'</div>' +
									'<div class="dynamicBigBtn">View Product</div>' +
									'<div style="clear:both;"></div>' +
								'</div>' +
								'<div class="dynamicBigContainer">' +
									'<div class="dynamicBigSalePrice"></div>' +
									'<div class="dynamicBigSku">'+ vendorNameVar +' '+ productSKU2 +'</div>' +
									'<div class="dynamicBigTitle">'+ productName +'</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</a>';
                }
				document.getElementById('dynamicBoxHolder2').innerHTML +='<div style="clear:both;"></div>';
				gGetData(false,'items',{ limit:50, attribute:'HP Featured' }, grabAttribute3);
            }
			
            function grabAttribute3()
            {
                document.getElementById('dynamicBox2').innerHTML = '';
                totalNum = count(gDataArray["items"]);
                for (var e in gDataArray["items"])
                {
                    productName =  gDataArray["items"][e]["ItemName"];
                    productSKU = gDataArray["items"][e]["InternalItemID"];
					productSKU2 = gDataArray["items"][e]["ItemNum"];
                    productURL = '/SKU-' + productSKU;
                    vendorIdVar = gDataArray["items"][e]["VendorID"];
					vendorNameVar = gDataArray["items"][e]["bName"];
                    productImageName = gDataArray["items"][e]["ImageName"];
                    productPrice = gDataArray["items"][e]["cbpPrice"]["price"];
                    productStockNum = gDataArray["items"][e]["cbpPrice"]["InStock"];
                    productIDVar = gDataArray["items"][e]["ItemID"];
                    productItemNum = gDataArray["items"][e]["ItemNum"];
                    
                    if (productStockNum == null)
                    {
                        productStockNum = "Not Available";
                    }
                    //alert(productIDVar +' - '+ vendorIdVar +' - '+ productItemNum);
                    //dump(gDataArray["items"]);
                    
                    document.getElementById('dynamicBox2').innerHTML += 
                    '<a href="'+ productURL +'">' +
						'<div class="dynamicProductBox">' +
							'<div class="dynamicProductImg"><img src="/vendors/'+ vendorIdVar +'/small/' + productImageName +'" /></div>' +
							'<div class="dynamicProductPrice">$'+ productPrice +'</div>' +
							'<div class="dynamicProductSku">'+ vendorNameVar +' '+ productSKU2 +'</div>' +
							'<div class="dynamicProductName">'+ productName +'</div>' +
							'<div class="dynamicProductBtn">View Product</div>' +
						'</div>' +
					'</a>';
                }
				document.getElementById('dynamicBox2').innerHTML +='<div style="clear:both;"></div>';
            }