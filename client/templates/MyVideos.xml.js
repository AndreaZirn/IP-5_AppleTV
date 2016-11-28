var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
<stackTemplate>
   <banner>
      <title>MyVideos</title>
   </banner>
   <collectionList>
      <shelf>
         <section>
            <lockup>
               <img src="${this.BASEURL}images/BadSanta" width="182" height="274" />
               <title>Bad Santa</title>
            </lockup>
            <lockup>
               <img src="${this.BASEURL}images/ForrestGump" width="182" height="274" />
               <title>Forrest Gump</title>
            </lockup>
            <lockup>
               <img src="${this.BASEURL}images/Moana" width="182" height="274" />
               <title>Moana</title>
            </lockup>
         </section>
      </shelf>
   </collectionList>
</stackTemplate>
</document>`
}
