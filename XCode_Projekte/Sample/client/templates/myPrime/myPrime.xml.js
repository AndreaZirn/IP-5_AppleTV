var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
  <style>
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .badge {
      tv-tint-color: rgb(0,0,0);
    }
    .9ColumnGrid {
      tv-interitem-spacing: 50;
    }
    </style>
  </head>
<catalogTemplate>
      <list>
         <section>
            <listItemLockup>
               <title>Top Movies</title>
               <decorationLabel>6</decorationLabel>
               <relatedContent>
                  <grid>
                     <section>
                        <lockup>
                           <img src="/resources/images/movies/DoctorStrange.jpg" width="250" height="376" />
                           <title>Doctor Strange</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/FantasticBeasts.jpg" width="250" height="376" />
                           <title>Fantastic Beasts</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/ForrestGump.jpg" width="250" height="376" />
                           <title>Forrest Gump</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/Inception.jpg" width="250" height="376" />
                           <title>Inception</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/Moana.jpg" width="250" height="376" />
                           <title>Moana</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/PulpFiction.jpg" width="250" height="376" />
                           <title>Pulp Fiction</title>
                        </lockup>
                     </section>
                  </grid>
               </relatedContent>
            </listItemLockup>
            <listItemLockup>
               <title>Top Series</title>
               <decorationLabel>2</decorationLabel>
               <relatedContent>
                  <grid>
                     <section>
                          <lockup>
                           <img src="/resources/images/movies/Inception.jpg" width="250" height="376" />
                           <title>Inception</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/Moana.jpg" width="250" height="376" />
                           <title>Moana</title>
                        </lockup>
                     </section>
                  </grid>
               </relatedContent>
            </listItemLockup>
            <listItemLockup>
               <title>Recommended</title>
               <decorationLabel>3</decorationLabel>
               <relatedContent>
                  <grid>
                     <section>
                        <lockup>
                           <img src="/resources/images/movies/ForrestGump.jpg" width="250" height="376" />
                           <title>Forrest Gump</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/Inception.jpg" width="250" height="376" />
                           <title>Inception</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/Moana.jpg" width="250" height="376" />
                           <title>Moana</title>
                        </lockup>
                     </section>
                  </grid>
               </relatedContent>
            </listItemLockup>
            <listItemLockup>
               <title>Packages</title>
               <decorationLabel>4</decorationLabel>
               <relatedContent>
                  <grid>
                     <section>
                        <lockup>
                           <img src="/resources/images/movies/ForrestGump.jpg" width="250" height="376" />
                           <title>Forrest Gump</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/Inception.jpg" width="250" height="376" />
                           <title>Inception</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/Moana.jpg" width="250" height="376" />
                           <title>Moana</title>
                        </lockup>
                     </section>
                  </grid>
               </relatedContent>
            </listItemLockup>
            <listItemLockup>
               <title>Genres</title>
               <relatedContent>
                  <shelf class="9ColumnGrid">
                    <header>
                      <title>Action</title>
                    </header>
                     <section>
                        <lockup>
                           <img src="/resources/images/movies/DoctorStrange.jpg" width="148" height="226" />
                           <title class="showTextOnHighlight">Doctor Strange</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/FantasticBeasts.jpg" width="148" height="226" />
                           <title class="showTextOnHighlight">Fantastic Beasts</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/ForrestGump.jpg" width="148" height="226" />
                           <title class="showTextOnHighlight">Forrest Gump</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/Inception.jpg" width="148" height="226" />
                           <title class="showTextOnHighlight">Inception</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/Moana.jpg" width="148" height="226" />
                           <title class="showTextOnHighlight">Moana</title>
                        </lockup>
                        <lockup>
                           <img src="/resources/images/movies/PulpFiction.jpg" width="148" height="226" />
                           <title class="showTextOnHighlight">Pulp Fiction</title>
                        </lockup>
                     </section>
                   </shelf>
               </relatedContent>
            </listItemLockup>
            <listItemLockup documentURL="/templates/Search.xml">
               <title>Search</title>
            </listItemLockup>
         </section>
      </list>
   </catalogTemplate>
</document>`
}
