/**
 * github-card.js
 */

'use strict';

function githubCard(args,content) {
    args = args.join(' ').split(',');
    let repoName = args[0] || 'Unknown Repo';
    let desc = content || 'There is no description';
    let demoUrl = args[1] || '';
    let githubLink = 'http://github.com/' + repoName;
    let demoBtn = demoUrl ? `<a href="${demoUrl}" target="_blank"><button class="btn">See Demo</button></a>` : '';

    return `<div class="github-card">
                <div class="github-card-icon"><i class="fab fa-github"></i></div> 
                <div class="github-card-content"> 
                    <p class="github-card-title">${repoName}</p>
                    <p class="github-card-desc">${desc}</p>
                    <div class="github-card-button">
                        <a href="${githubLink}" target="_blank"><button class="btn">Github Link</button></a>
                         ` + demoBtn + `
                    </div>
                </div>
            </div>`;
}

hexo.extend.tag.register('github', githubCard, {ends: true});
